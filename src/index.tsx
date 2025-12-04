import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// API endpoints for dashboard data
app.get('/api/stats', (c) => {
  return c.json({
    revenue: { value: '$45,231', change: '+20.1%', trend: 'up' },
    orders: { value: '3,582', change: '+8.5%', trend: 'up' },
    customers: { value: '1,423', change: '+12.3%', trend: 'up' },
    growth: { value: '92.5%', change: '+4.2%', trend: 'up' }
  })
})

app.get('/api/chart-data', (c) => {
  return c.json({
    sales: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      data: [12000, 19000, 15000, 25000, 22000, 30000, 28000, 32000, 35000, 38000, 42000, 45231]
    },
    orders: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      data: [420, 510, 480, 580, 620, 450, 380]
    }
  })
})

app.get('/api/recent-orders', (c) => {
  return c.json([
    { id: '#ORD-001', customer: 'John Doe', product: 'Wireless Headphones', amount: '$299', status: 'Completed', date: '2025-12-01' },
    { id: '#ORD-002', customer: 'Jane Smith', product: 'Smart Watch', amount: '$399', status: 'Processing', date: '2025-12-02' },
    { id: '#ORD-003', customer: 'Mike Johnson', product: 'Laptop Stand', amount: '$79', status: 'Completed', date: '2025-12-03' },
    { id: '#ORD-004', customer: 'Sarah Williams', product: 'Mechanical Keyboard', amount: '$189', status: 'Shipped', date: '2025-12-04' },
    { id: '#ORD-005', customer: 'David Brown', product: 'USB-C Hub', amount: '$59', status: 'Completed', date: '2025-12-04' }
  ])
})

// Main dashboard page
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Dashboard - Analytics Overview</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
        <link href="/static/style.css" rel="stylesheet">
    </head>
    <body class="bg-gray-50">
        <div class="flex h-screen overflow-hidden">
            <!-- Sidebar -->
            <aside id="sidebar" class="w-64 bg-white shadow-lg flex-shrink-0 transition-transform duration-300 fixed lg:relative h-full z-40">
                <div class="p-6">
                    <div class="flex items-center space-x-2 mb-8">
                        <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <i class="fas fa-chart-line text-white"></i>
                        </div>
                        <h1 class="text-xl font-bold text-gray-800">Dashboard</h1>
                    </div>
                    <nav class="space-y-2">
                        <a href="#" class="flex items-center space-x-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg transition">
                            <i class="fas fa-home w-5"></i>
                            <span class="font-medium">Overview</span>
                        </a>
                        <a href="#" class="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition">
                            <i class="fas fa-chart-bar w-5"></i>
                            <span>Analytics</span>
                        </a>
                        <a href="#" class="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition">
                            <i class="fas fa-shopping-cart w-5"></i>
                            <span>Orders</span>
                        </a>
                        <a href="#" class="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition">
                            <i class="fas fa-users w-5"></i>
                            <span>Customers</span>
                        </a>
                        <a href="#" class="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition">
                            <i class="fas fa-box w-5"></i>
                            <span>Products</span>
                        </a>
                        <a href="#" class="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition">
                            <i class="fas fa-cog w-5"></i>
                            <span>Settings</span>
                        </a>
                    </nav>
                </div>
                <div class="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                            <i class="fas fa-user text-gray-600"></i>
                        </div>
                        <div class="flex-1">
                            <p class="text-sm font-medium text-gray-800">Admin User</p>
                            <p class="text-xs text-gray-500">admin@example.com</p>
                        </div>
                    </div>
                </div>
            </aside>

            <!-- Main Content -->
            <div class="flex-1 flex flex-col overflow-hidden">
                <!-- Header -->
                <header class="bg-white shadow-sm">
                    <div class="flex items-center justify-between px-6 py-4">
                        <div class="flex items-center">
                            <button id="menu-toggle" class="lg:hidden mr-4 text-gray-600 hover:text-gray-800">
                                <i class="fas fa-bars text-xl"></i>
                            </button>
                            <div>
                                <h2 class="text-2xl font-bold text-gray-800">Overview</h2>
                                <p class="text-sm text-gray-500">Welcome back! Here's what's happening today.</p>
                            </div>
                        </div>
                        <div class="flex items-center space-x-4">
                            <div class="relative hidden md:block">
                                <input type="text" placeholder="Search..." class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                            </div>
                            <button class="relative text-gray-600 hover:text-gray-800">
                                <i class="fas fa-bell text-xl"></i>
                                <span class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">3</span>
                            </button>
                        </div>
                    </div>
                </header>

                <!-- Dashboard Content -->
                <main class="flex-1 overflow-y-auto p-6 bg-gray-50">
                    <!-- Stats Cards -->
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6" id="stats-cards">
                        <!-- Loading skeleton -->
                        <div class="bg-white rounded-xl shadow-sm p-6 animate-pulse">
                            <div class="h-4 bg-gray-200 rounded w-24 mb-4"></div>
                            <div class="h-8 bg-gray-200 rounded w-32"></div>
                        </div>
                    </div>

                    <!-- Charts Row -->
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <!-- Revenue Chart -->
                        <div class="bg-white rounded-xl shadow-sm p-6">
                            <div class="flex items-center justify-between mb-6">
                                <h3 class="text-lg font-semibold text-gray-800">Revenue Overview</h3>
                                <select class="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option>Last 12 Months</option>
                                    <option>Last 6 Months</option>
                                    <option>Last 3 Months</option>
                                </select>
                            </div>
                            <div class="relative h-64">
                                <canvas id="revenueChart"></canvas>
                            </div>
                        </div>

                        <!-- Orders Chart -->
                        <div class="bg-white rounded-xl shadow-sm p-6">
                            <div class="flex items-center justify-between mb-6">
                                <h3 class="text-lg font-semibold text-gray-800">Weekly Orders</h3>
                                <select class="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option>This Week</option>
                                    <option>Last Week</option>
                                </select>
                            </div>
                            <div class="relative h-64">
                                <canvas id="ordersChart"></canvas>
                            </div>
                        </div>
                    </div>

                    <!-- Recent Orders Table -->
                    <div class="bg-white rounded-xl shadow-sm">
                        <div class="p-6 border-b border-gray-200">
                            <div class="flex items-center justify-between">
                                <h3 class="text-lg font-semibold text-gray-800">Recent Orders</h3>
                                <a href="#" class="text-sm text-blue-600 hover:text-blue-700 font-medium">View all</a>
                            </div>
                        </div>
                        <div class="overflow-x-auto">
                            <table class="w-full">
                                <thead class="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    </tr>
                                </thead>
                                <tbody id="orders-table" class="bg-white divide-y divide-gray-200">
                                    <!-- Loading skeleton -->
                                    <tr class="animate-pulse">
                                        <td class="px-6 py-4"><div class="h-4 bg-gray-200 rounded w-20"></div></td>
                                        <td class="px-6 py-4"><div class="h-4 bg-gray-200 rounded w-32"></div></td>
                                        <td class="px-6 py-4"><div class="h-4 bg-gray-200 rounded w-40"></div></td>
                                        <td class="px-6 py-4"><div class="h-4 bg-gray-200 rounded w-16"></div></td>
                                        <td class="px-6 py-4"><div class="h-4 bg-gray-200 rounded w-24"></div></td>
                                        <td class="px-6 py-4"><div class="h-4 bg-gray-200 rounded w-24"></div></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>

        <!-- Sidebar overlay for mobile -->
        <div id="sidebar-overlay" class="fixed inset-0 bg-black bg-opacity-50 z-30 hidden lg:hidden"></div>

        <script src="/static/app.js"></script>
    </body>
    </html>
  `)
})

export default app
