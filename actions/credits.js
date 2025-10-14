"use server"

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Package } from "lucide-react";
import { revalidatePath } from "next/cache";
import { format } from "path";

const PLAN_CREDITS = {
    free_user: 0,
    standard: 10,
    premium: 24,
};

const APPOINTMENT_CREDIT_COST = 2;

export async function checkAndAllocateCredits(user){
     try {
        if(!user) {
            return null ;
        }

        if(user.role !== "PATIENT") {
            return user ;
        }

        const {has} = await auth();

        const hasBasic = has({plan: "free_user"});
        const hasStandard = has({plan: "standard"});
        const hasPremium = has({plan: "premium"});

        let currentPlan = null;
        let creditToAllocate = 0;

        if(hasPremium){
            currentPlan = "premium";
            creditToAllocate = PLAN_CREDITS.premium;
        } else if(hasStandard){
            currentPlan = "standard";
            creditToAllocate = PLAN_CREDITS.standard;
        } else if(hasBasic){
            currentPlan = "free_user";
            creditToAllocate = PLAN_CREDITS.free_user;
        }

        if(!currentPlan){
            return user ;
        }

        const currentMonth = format(new Date(), "yyyy-MM") ;

        if(user.transactions.length > 0){
            const latestTransaction = user.transactions[0];
            const transactionsMonth = format (
                new Date(latestTransaction.createAt),
                "yyyy-MM"
            );
            const transactionsPlan = latestTransaction.packageId;
            if(
                transactionsMonth === currentMonth && 
                transactionsPlan === currentPlan
            ){
                return user;
            }
        }
            const updateUser = await db.$transaction(async(tx) => {
                await tx.creditTransaction.create({
                    data: {
                        userId: user.id,
                        amount: creditToAllocate,
                        type:"CREDIT_PURCHASE",
                        packageId: currentPlan,
                    },
                });
                const updateUser = await tx.user.update({
                    where: {
                        id: user.id,
                    },
                    data: {
                        credits: {
                            increment: creditToAllocate,
                        },
                    },
                });
                return updateUser;
            });

            revalidatePath("/doctors");
            revalidatePath("/appointments");

            return updateUser;
        }
    catch(error) {
        console.error(
            "Failed to check subscriber and allocate credits:",
            error.message
        );
        return null ;
    }
}