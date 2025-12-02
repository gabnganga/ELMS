import { useGetReportsQuery } from "../../../../../features/employees/employeesAPI";
import {
  PieChart, Pie, Cell,
  BarChart, Bar,
  XAxis, YAxis, Tooltip,
  ResponsiveContainer, LineChart, Line, CartesianGrid
} from "recharts";

const Reports = () => {
  const { data, isLoading, error } = useGetReportsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error loading reports</p>;

  const reports = data?.data || {};

  const statusSummary = reports?.charts?.statusSummary || [];
  const leaveTypeUsage = reports?.charts?.leaveTypeUsage || [];
  const monthlyLeaveTrend = reports?.charts?.monthlyLeaveTrend || [];
  const topLeaveTakers = reports?.topLeaveTakers || [];

  const totalEmployees = reports?.cards?.totalEmployees || 0;
  const employeesOnLeaveToday = reports?.cards?.employeesOnLeaveToday || 0;
  const leavePercentage = reports?.cards?.leavePercentage || "0.00";

  return (
    <div className="p-6 space-y-8">

      {/* TOP SUMMARY CARDS */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-green-400 to-green-700 text-white p-6 text-center rounded-xl shadow">
          <h3 className="font-bold text-lg">Total Employees</h3>
          <p className="text-3xl font-bold">{totalEmployees}</p>
        </div>

        <div className="bg-gradient-to-r from-red-400 to-red-700 text-white p-6 text-center rounded-xl shadow">
          <h3 className="font-bold text-lg">On Leave Today</h3>
          <p className="text-3xl font-bold">{employeesOnLeaveToday}</p>
        </div>

        <div className="bg-gradient-to-r from-blue-400 to-blue-700 text-white p-6 text-center rounded-xl shadow">
          <h3 className="font-bold text-lg">% On Leave</h3>
          <p className="text-3xl font-bold">{leavePercentage}%</p>
        </div>
      </div>

      {/* STATUS CARDS */}
      <div className="grid grid-cols-3 gap-6">
        {statusSummary.map((item: any) => (
          <div
            key={item.status}
            className="bg-gradient-to-r from-blue-300 to-blue-700 text-white p-6 text-center rounded-xl shadow"
          >
            <h3 className="font-bold text-lg">{item.status}</h3>
            <p className="text-xl font-semibold">{item.total}</p>
          </div>
        ))}
      </div>

      {/* LEAVE TYPE USAGE */}
      <div className="bg-white shadow p-6 rounded-xl">
        <h2 className="font-bold mb-4">Leave Type Usage</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={leaveTypeUsage} dataKey="total" nameKey="leavetype" outerRadius={120}>
              {leaveTypeUsage.map((_: any, i: number) => (
                <Cell key={i} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* MONTHLY LEAVE TREND LINE CHART */}
      <div className="bg-white shadow p-6 rounded-xl">
        <h2 className="font-bold mb-4">Monthly Leave Trend</h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={monthlyLeaveTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="total" stroke="" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* TOP LEAVE TAKERS */}
      <div className="bg-white shadow p-6 rounded-xl">
        <h2 className="font-bold mb-4">Top Leave Takers</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topLeaveTakers}>
            <XAxis dataKey="username" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="totalLeaves" />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default Reports;
