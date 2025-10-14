
import PageHeader from '../../../components/page-header';
import { Stethoscope } from 'lucide-react';

export const metadata = {
    title: "Doctor Dashboard - MediCare",
    description: "Manage your appointments and availability",
}; 

interface DashbordLayoutProps{
  children:  React.ReactNode;
}

const DoctorDashboardLayout = ({children}: DashbordLayoutProps) => {
  return (
    <div className='container mx-auto px-4 py-8'>
      <PageHeader icon={<Stethoscope />} title={"Doctor Dashboard"}/>
        {children}
    </div>
  );
};

export default DoctorDashboardLayout