<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Admin Dashboard | Crestmont Digital Assets</title>

    <link rel="stylesheet" href="style.css">

    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <script src="script.js"></script>
</head>

<body class="dashboard-page">

    <header class="dashboard-header">

        <div class="dashboard-brand">
            <a href="dashboard.html">
                Crestmont Digital Assets
            </a>
        </div>

        <div class="dashboard-user">
            <span>Admin</span>
            <a href="profile.html" class="dashboard-profile-link">
                Profile
            </a>
        </div>

    </header>


    <div class="dashboard-layout">

        <aside class="dashboard-sidebar">

            <nav class="dashboard-nav">

                <a href="admin.html"
                   class="dashboard-nav-link active">
                    Admin Overview
                </a>

                <a href="#investments"
                   class="dashboard-nav-link">
                    Investments
                </a>

                <a href="#deposits"
                   class="dashboard-nav-link">
                    Deposits
                </a>

                <a href="#withdrawals"
                   class="dashboard-nav-link">
                    Withdrawals
                </a>

                <a href="#users"
                   class="dashboard-nav-link">
                    Users
                </a>

                <a href="dashboard.html"
                   class="dashboard-nav-link">
                    User Dashboard
                </a>

            </nav>

        </aside>


        <main class="dashboard-main">

            <section class="dashboard-section">

                <div class="dashboard-section-heading">

                    <p class="dashboard-eyebrow">
                        ADMINISTRATION
                    </p>

                    <h1>
                        Admin Dashboard
                    </h1>

                    <p>
                        Manage platform activity and review
                        customer requests securely.
                    </p>

                </div>


                <div class="portfolio-card-grid">

                    <article class="portfolio-card">

                        <div class="portfolio-card-top">
                            <span>Pending Investments</span>
                            <span>↗️</span>
                        </div>

                        <strong class="dashboard-stat-value"
                                id="pendingInvestmentsCount">
                            0
                        </strong>

                        <p>
                            Investment requests awaiting review
                        </p>

                    </article>


                    <article class="portfolio-card">

                        <div class="portfolio-card-top">
                            <span>Pending Deposits</span>
                            <span>↓</span>
                        </div>

                        <strong class="dashboard-stat-value"
                                id="pendingDepositsCount">
                            0
                        </strong>

                        <p>
                            Deposits awaiting processing
                        </p>

                    </article>


                    <article class="portfolio-card">

                        <div class="portfolio-card-top">
                            <span>Pending Withdrawals</span>
                            <span>↑</span>
                        </div>

                        <strong class="dashboard-stat-value"
                                id="pendingWithdrawalsCount">
                            0
                        </strong>

                        <p>
                            Withdrawals awaiting review
                        </p>

                    </article>

                </div>


                <div class="dashboard-panel"
                     id="investments">

                    <div class="dashboard-panel-header">

                        <div>

                            <h2>
                                Investment Requests
                            </h2>

                            <p>
                                Review investment requests
                                submitted by customers.
                            </p>

                        </div>

                    </div>


                    <div class="empty-dashboard-card"
                         id="adminInvestmentRecords">

                        <strong>
                            No investment requests yet
                        </strong>

                        <p>
                            New investment requests will appear
                            here when customers submit them.
                        </p>

                    </div>

                </div>


                <div class="dashboard-panel"
                     id="deposits">

                    <div class="dashboard-panel-header">

                        <div>

                            <h2>
                                Deposit Requests
                            </h2>

                            <p>
                                Review customer deposit activity.
                            </p>

                        </div>

                    </div>


                    <div class="empty-dashboard-card">

                        <strong>
                            No deposit requests yet
                        </strong>

                        <p>
                            Deposit activity will appear here
                            when real requests are created.
                        </p>

                    </div>

                </div>


                <div class="dashboard-panel"
                     id="withdrawals">

                    <div class="dashboard-panel-header">

                        <div>

                            <h2>
                                Withdrawal Requests
                            </h2>

                            <p>
                                Review customer withdrawal activity.
                            </p>

                        </div>

                    </div>


                    <div class="empty-dashboard-card">

                        <strong>
                            No withdrawal requests yet
                        </strong>

                        <p>
                            Withdrawal activity will appear here
                            when real requests are created.
                        </p>

                    </div>

                </div>


                <div class="dashboard-panel"
                     id="users">

                    <div class="dashboard-panel-header">

                        <div>

                            <h2>
                                User Management
                            </h2>

                            <p>
                                Customer account management will
                                be connected here securely.
                            </p>

                        </div>

                    </div>


                    <div class="empty-dashboard-card">

                        <strong>
                            User management
                        </strong>

                        <p>
                            Customer information will appear here
                            after the secure admin tools are connected.
                        </p>

                    </div>

                </div>

            </section>

        </main>

    </div>

</body>

</html>