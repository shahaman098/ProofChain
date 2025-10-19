import { TrendingUp, FileText, CheckCircle, ShieldOff } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Updated analytics data - October 2025
const chartData = [
  { month: "May", reports: 23 },
  { month: "Jun", reports: 31 },
  { month: "Jul", reports: 28 },
  { month: "Aug", reports: 42 },
  { month: "Sep", reports: 38 },
  { month: "Oct", reports: 47 },
];

const stats = [
  {
    title: "Total Reports Submitted",
    value: "129",
    change: "+12%",
    icon: FileText,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Verified Reports",
    value: "98",
    change: "76%",
    icon: CheckCircle,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    title: "Anonymous Reports",
    value: "47",
    change: "36%",
    icon: ShieldOff,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
];

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Analytics & Insights</h2>
        <p className="text-sm text-muted-foreground">Platform statistics and reporting trends</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat, index) => (
          <Card
            key={stat.title}
            className="bg-gradient-card shadow-md border-border hover:shadow-xl hover:border-primary/20 transition-all duration-300 group cursor-pointer animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <div className={`${stat.bgColor} p-2 rounded-lg group-hover:scale-110 transition-transform`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                {stat.value}
              </div>
              <p className="text-xs text-muted-foreground mt-1 group-hover:text-foreground transition-colors">
                <span className={stat.color}>{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card
        className="relative overflow-hidden bg-gradient-card shadow-lg border-border hover:shadow-xl transition-all duration-300 animate-fade-in"
        style={{ animationDelay: "0.3s" }}
      >
        {/* Futuristic background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-2xl pointer-events-none"></div>

        <CardHeader className="relative z-10">
          <CardTitle className="flex items-center gap-2 text-foreground">
            <div className="p-2 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            Reporting Trends
          </CardTitle>
          <CardDescription>Monthly report submissions — Last 6 months (May - Oct 2025)</CardDescription>
        </CardHeader>
        <CardContent className="relative z-10">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.9} />
                  <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity={0.7} />
                  <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity={0.5} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.3} vertical={false} />
              <XAxis
                dataKey="month"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                fontWeight={500}
                tickLine={false}
                axisLine={{ stroke: "hsl(var(--border))", strokeWidth: 1 }}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                fontWeight={500}
                tickLine={false}
                axisLine={{ stroke: "hsl(var(--border))", strokeWidth: 1 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--primary))",
                  borderRadius: "12px",
                  color: "hsl(var(--foreground))",
                  boxShadow: "0 10px 40px -10px hsl(var(--primary) / 0.3)",
                  backdropFilter: "blur(8px)",
                }}
                cursor={{ fill: "hsl(var(--primary) / 0.05)" }}
                labelStyle={{ fontWeight: 600, color: "hsl(var(--primary))" }}
              />
              <Bar
                dataKey="reports"
                fill="url(#barGradient)"
                radius={[12, 12, 0, 0]}
                maxBarSize={60}
                animationDuration={1000}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
