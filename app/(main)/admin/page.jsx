import { getPendingDoctors, getVerifiedDoctors } from '@/actions/admin';
import { TabsContent } from '@/components/ui/tabs';
import React from 'react'
import PendingDoctors from './_components/pending-doctors';
import VerifiedDoctors from './_components/verified-doctors';

const AdminPage = async () => {

   const [pendingDoctorsData, verifiedDoctorsData] = await Promise.all([
      getPendingDoctors(),
      getVerifiedDoctors(),
   ]);

  return (
    <div>
      <TabsContent value="pending">
         <PendingDoctors doctors = {pendingDoctorsData?.doctors || []} />
      </TabsContent>
      <TabsContent value="doctors">
         < VerifiedDoctors doctors = {verifiedDoctorsData?.doctors || []} />
      </TabsContent>
    </div>
  )
}

export default AdminPage ;