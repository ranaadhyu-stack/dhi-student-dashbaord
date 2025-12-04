// Dashboard App JavaScript

// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebar-overlay');

menuToggle?.addEventListener('click', () => {
    sidebar.classList.toggle('-translate-x-full');
    sidebarOverlay.classList.toggle('hidden');
});

sidebarOverlay?.addEventListener('click', () => {
    sidebar.classList.add('-translate-x-full');
    sidebarOverlay.classList.add('hidden');
});

// Fetch and display stats
async function loadStats() {
    try {
        const response = await fetch('/api/stats');
        const stats = await response.json();
        
        const statsContainer = document.getElementById('stats-cards');
        statsContainer.innerHTML = `
            ${createStatCard('Revenue', stats.revenue.value, stats.revenue.change, stats.revenue.trend, 'fa-dollar-sign', 'blue')}
            ${createStatCard('Orders', stats.orders.value, stats.orders.change, stats.orders.trend, 'fa-shopping-cart', 'green')}
            ${createStatCard('Customers', stats.customers.value, stats.customers.change, stats.customers.trend, 'fa-users', 'purple')}
            ${createStatCard('Growth', stats.growth.value, stats.growth.change, stats.growth.trend, 'fa-chart-line', 'orange')}
        `;
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

function createStatCard(title, value, change, trend, icon, color) {
    const colors = {
        blue: 'bg-blue-100 text-blue-600',
        green: 'bg-green-100 text-green-600',
        purple: 'bg-purple-100 text-purple-600',
        orange: 'bg-orange-100 text-orange-600'
    };
    
    const trendColor = trend === 'up' ? 'text-green-600' : 'text-red-600';
    const trendIcon = trend === 'up' ? 'fa-arrow-up' : 'fa-arrow-down';
    
    return `
        <div class="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 ${colors[color]} rounded-lg flex items-center justify-center">
                    <i class="fas ${icon} text-xl"></i>
                </div>
                <span class="${trendColor} text-sm font-medium flex items-center">
                    <i class="fas ${trendIcon} mr-1 text-xs"></i>
                    ${change}
                </span>
            </div>
            <h3 class="text-gray-600 text-sm font-medium mb-1">${title}</h3>
            <p class="text-2xl font-bold text-gray-800">${value}</p>
        </div>
    `;
}

// Fetch and display recent orders
async function loadRecentOrders() {
    try {
        const response = await fetch('/api/recent-orders');
        const orders = await response.json();
        
        const tableBody = document.getElementById('orders-table');
        tableBody.innerHTML = orders.map(order => `
            <tr class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${order.id}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${order.customer}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${order.product}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${order.amount}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(order.status)}">
                        ${order.status}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.date}</td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error loading orders:', error);
    }
}

function getStatusClass(status) {
    const classes = {
        'Completed': 'bg-green-100 text-green-800',
        'Processing': 'bg-yellow-100 text-yellow-800',
        'Shipped': 'bg-blue-100 text-blue-800',
        'Cancelled': 'bg-red-100 text-red-800'
    };
    return classes[status] || 'bg-gray-100 text-gray-800';
}

// Initialize charts
let revenueChart = null;
let ordersChart = null;

async function initCharts() {
    try {
        const response = await fetch('/api/chart-data');
        const data = await response.json();
        
        // Revenue Chart
        const revenueCtx = document.getElementById('revenueChart');
        if (revenueChart) revenueChart.destroy();
        revenueChart = new Chart(revenueCtx, {
            type: 'line',
            data: {
                labels: data.sales.labels,
                datasets: [{
                    label: 'Revenue',
                    data: data.sales.data,
                    borderColor: 'rgb(59, 130, 246)',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointRadius: 4,
                    pointBackgroundColor: 'rgb(59, 130, 246)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return ' $' + context.parsed.y.toLocaleString();
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + (value / 1000) + 'k';
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
        
        // Orders Chart
        const ordersCtx = document.getElementById('ordersChart');
        if (ordersChart) ordersChart.destroy();
        ordersChart = new Chart(ordersCtx, {
            type: 'bar',
            data: {
                labels: data.orders.labels,
                datasets: [{
                    label: 'Orders',
                    data: data.orders.data,
                    backgroundColor: 'rgba(147, 51, 234, 0.8)',
                    borderColor: 'rgb(147, 51, 234)',
                    borderWidth: 0,
                    borderRadius: 8,
                    barThickness: 40
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error initializing charts:', error);
    }
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
    loadStats();
    loadRecentOrders();
    initCharts();
});
