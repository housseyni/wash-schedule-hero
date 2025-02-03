import AdminCalendar from "@/components/AdminCalendar";

const Admin = () => {
  return (
    <div className="min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-8">Administration</h1>
      <AdminCalendar />
    </div>
  );
};

export default Admin;