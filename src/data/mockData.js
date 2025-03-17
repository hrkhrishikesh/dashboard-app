export const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    status: "Active",
    role: "Admin",
    lastLogin: "2023-05-10",
    joined: "2022-01-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    status: "Active",
    role: "User",
    lastLogin: "2023-05-09",
    joined: "2022-02-20",
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    status: "Inactive",
    role: "Manager",
    lastLogin: "2023-04-25",
    joined: "2022-03-10",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    status: "Active",
    role: "User",
    lastLogin: "2023-05-08",
    joined: "2022-01-30",
  },
  {
    id: 5,
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    status: "Active",
    role: "Developer",
    lastLogin: "2023-05-07",
    joined: "2022-02-15",
  },
  {
    id: 6,
    name: "Sarah Brown",
    email: "sarah.brown@example.com",
    status: "Inactive",
    role: "Designer",
    lastLogin: "2023-04-15",
    joined: "2022-03-25",
  },
  {
    id: 7,
    name: "David Taylor",
    email: "david.taylor@example.com",
    status: "Active",
    role: "Developer",
    lastLogin: "2023-05-06",
    joined: "2022-02-10",
  },
  {
    id: 8,
    name: "Lisa Anderson",
    email: "lisa.anderson@example.com",
    status: "Active",
    role: "User",
    lastLogin: "2023-05-05",
    joined: "2022-04-05",
  },
  {
    id: 9,
    name: "William Thomas",
    email: "william.thomas@example.com",
    status: "Active",
    role: "Manager",
    lastLogin: "2023-05-04",
    joined: "2022-03-15",
  },
  {
    id: 10,
    name: "Jennifer Jackson",
    email: "jennifer.jackson@example.com",
    status: "Inactive",
    role: "User",
    lastLogin: "2023-04-10",
    joined: "2022-01-25",
  },
  {
    id: 11,
    name: "Daniel White",
    email: "daniel.white@example.com",
    status: "Active",
    role: "Developer",
    lastLogin: "2023-05-03",
    joined: "2022-02-28",
  },
  {
    id: 12,
    name: "Karen Harris",
    email: "karen.harris@example.com",
    status: "Active",
    role: "Designer",
    lastLogin: "2023-05-02",
    joined: "2022-03-20",
  },
];

export const chartData = {
  monthly: [
    { month: "Jan", users: 200, revenue: 5000 },
    { month: "Feb", users: 250, revenue: 6200 },
    { month: "Mar", users: 300, revenue: 7500 },
    { month: "Apr", users: 350, revenue: 8800 },
    { month: "May", users: 400, revenue: 9700 },
    { month: "Jun", users: 450, revenue: 11000 },
  ],
  weekly: [
    { day: "Mon", visitors: 120, pageViews: 550 },
    { day: "Tue", visitors: 132, pageViews: 590 },
    { day: "Wed", visitors: 141, pageViews: 620 },
    { day: "Thu", visitors: 135, pageViews: 585 },
    { day: "Fri", visitors: 138, pageViews: 600 },
    { day: "Sat", visitors: 80, pageViews: 400 },
    { day: "Sun", visitors: 75, pageViews: 380 },
  ],
};

export const dashboardStats = [
  { title: "Total Users", value: 1280, change: "+12%", icon: "users" },
  { title: "Revenue", value: "$52,350", change: "+8%", icon: "wallet" },
  { title: "Tasks Completed", value: 867, change: "+5%", icon: "check-circle" },
  {
    title: "Pending Issues",
    value: 14,
    change: "-2%",
    icon: "exclamation-circle",
  },
];

export const notifications = [
  { id: 1, message: "New user registered", time: "5 mins ago", read: false },
  {
    id: 2,
    message: "Server update completed",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    message: "Weekly report generated",
    time: "3 hours ago",
    read: true,
  },
  {
    id: 4,
    message: "System alert: High CPU usage",
    time: "4 hours ago",
    read: false,
  },
  {
    id: 5,
    message: "Database backup completed",
    time: "5 hours ago",
    read: true,
  },
];

export const recentActivities = [
  {
    id: 1,
    user: "John Doe",
    action: "created a new project",
    time: "10 mins ago",
  },
  {
    id: 2,
    user: "Jane Smith",
    action: "uploaded a document",
    time: "30 mins ago",
  },
  {
    id: 3,
    user: "Robert Johnson",
    action: "completed 5 tasks",
    time: "1 hour ago",
  },
  { id: 4, user: "Emily Davis", action: "deleted a file", time: "2 hours ago" },
];
