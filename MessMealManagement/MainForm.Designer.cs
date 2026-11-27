namespace MessMealManagement
{
    partial class MainForm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            panelHeader = new Panel();
            lblTitle = new Label();
            lblSubtitle = new Label();
            panelSidebar = new Panel();
            btnReports = new Button();
            btnMonthlyOverview = new Button();
            btnMeals = new Button();
            btnMarket = new Button();
            btnDeposite = new Button();
            btnMembers = new Button();
            btnDashboard = new Button();
            panelSidebarFooter = new Panel();
            lblFooterRate = new Label();
            lblFooterCycle = new Label();
            panelMessBrand = new Panel();
            lblBrandSub = new Label();
            lblBrandTitle = new Label();
            panelContent = new Panel();
            pnlWelcomeHero = new Panel();
            lblHeroSub = new Label();
            lblHeroTitle = new Label();
            lblHeroBadge = new Label();
            tblCardsLayout = new TableLayoutPanel();
            pnlCardMeals = new Panel();
            lblCardMealsDesc = new Label();
            lblCardMealsTitle = new Label();
            lblCardMealsIcon = new Label();
            pnlCardMarket = new Panel();
            lblCardMarketDesc = new Label();
            lblCardMarketTitle = new Label();
            lblCardMarketIcon = new Label();
            pnlCardReports = new Panel();
            lblCardReportsDesc = new Label();
            lblCardReportsTitle = new Label();
            lblCardReportsIcon = new Label();
            pnlTipCard = new Panel();
            lblTipText = new Label();
            lblTipTitle = new Label();
            panelHeader.SuspendLayout();
            panelSidebar.SuspendLayout();
            panelSidebarFooter.SuspendLayout();
            panelMessBrand.SuspendLayout();
            panelContent.SuspendLayout();
            pnlWelcomeHero.SuspendLayout();
            tblCardsLayout.SuspendLayout();
            pnlCardMeals.SuspendLayout();
            pnlCardMarket.SuspendLayout();
            pnlCardReports.SuspendLayout();
            pnlTipCard.SuspendLayout();
            SuspendLayout();
            // 
            // panelHeader
            // 
            panelHeader.BackColor = Color.FromArgb(15, 23, 42);
            panelHeader.Controls.Add(lblSubtitle);
            panelHeader.Controls.Add(lblTitle);
            panelHeader.Dock = DockStyle.Top;
            panelHeader.Location = new Point(0, 0);
            panelHeader.Name = "panelHeader";
            panelHeader.Size = new Size(1184, 65);
            panelHeader.TabIndex = 1;
            // 
            // lblTitle
            // 
            lblTitle.AutoSize = true;
            lblTitle.Font = new Font("Segoe UI", 15F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblTitle.ForeColor = Color.White;
            lblTitle.Location = new Point(20, 16);
            lblTitle.Name = "lblTitle";
            lblTitle.Size = new Size(410, 35);
            lblTitle.TabIndex = 0;
            lblTitle.Text = "🍽️ MESS MEAL MANAGEMENT";
            // 
            // lblSubtitle
            // 
            lblSubtitle.Anchor = AnchorStyles.Top | AnchorStyles.Right;
            lblSubtitle.AutoSize = true;
            lblSubtitle.Font = new Font("Segoe UI", 9.5F, FontStyle.Regular, GraphicsUnit.Point, 0);
            lblSubtitle.ForeColor = Color.FromArgb(148, 163, 184);
            lblSubtitle.Location = new Point(960, 22);
            lblSubtitle.Name = "lblSubtitle";
            lblSubtitle.Size = new Size(204, 21);
            lblSubtitle.TabIndex = 1;
            lblSubtitle.Text = "Mess Solution";
            // 
            // panelSidebar
            // 
            panelSidebar.BackColor = Color.FromArgb(15, 23, 42);
            panelSidebar.Controls.Add(btnReports);
            panelSidebar.Controls.Add(btnMonthlyOverview);
            panelSidebar.Controls.Add(btnMeals);
            panelSidebar.Controls.Add(btnMarket);
            panelSidebar.Controls.Add(btnDeposite);
            panelSidebar.Controls.Add(btnMembers);
            panelSidebar.Controls.Add(btnDashboard);
            panelSidebar.Controls.Add(panelSidebarFooter);
            panelSidebar.Controls.Add(panelMessBrand);
            panelSidebar.Dock = DockStyle.Left;
            panelSidebar.Location = new Point(0, 65);
            panelSidebar.Name = "panelSidebar";
            panelSidebar.Size = new Size(240, 714);
            panelSidebar.TabIndex = 2;
            // 
            // panelMessBrand
            // 
            panelMessBrand.BackColor = Color.FromArgb(30, 41, 59);
            panelMessBrand.Controls.Add(lblBrandSub);
            panelMessBrand.Controls.Add(lblBrandTitle);
            panelMessBrand.Dock = DockStyle.Top;
            panelMessBrand.Location = new Point(0, 0);
            panelMessBrand.Name = "panelMessBrand";
            panelMessBrand.Size = new Size(240, 70);
            panelMessBrand.TabIndex = 7;
            // 
            // lblBrandTitle
            // 
            lblBrandTitle.AutoSize = true;
            lblBrandTitle.Font = new Font("Segoe UI", 10.5F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblBrandTitle.ForeColor = Color.White;
            lblBrandTitle.Location = new Point(16, 14);
            lblBrandTitle.Name = "lblBrandTitle";
            lblBrandTitle.Size = new Size(130, 25);
            lblBrandTitle.TabIndex = 0;
            lblBrandTitle.Text = "🏠 Herar Alo";
            // 
            // lblBrandSub
            // 
            lblBrandSub.AutoSize = true;
            lblBrandSub.Font = new Font("Segoe UI", 9F, FontStyle.Regular, GraphicsUnit.Point, 0);
            lblBrandSub.ForeColor = Color.FromArgb(148, 163, 184);
            lblBrandSub.Location = new Point(18, 38);
            lblBrandSub.Name = "lblBrandSub";
            lblBrandSub.Size = new Size(125, 20);
            lblBrandSub.TabIndex = 1;
            lblBrandSub.Text = "6 Active Members";
            // 
            // btnDashboard
            // 
            btnDashboard.BackColor = Color.FromArgb(15, 23, 42);
            btnDashboard.Cursor = Cursors.Hand;
            btnDashboard.Dock = DockStyle.Top;
            btnDashboard.FlatAppearance.BorderSize = 0;
            btnDashboard.FlatAppearance.MouseOverBackColor = Color.FromArgb(37, 99, 235);
            btnDashboard.FlatStyle = FlatStyle.Flat;
            btnDashboard.Font = new Font("Segoe UI Semibold", 10.5F, FontStyle.Bold, GraphicsUnit.Point, 0);
            btnDashboard.ForeColor = Color.FromArgb(226, 232, 240);
            btnDashboard.Location = new Point(0, 70);
            btnDashboard.Name = "btnDashboard";
            btnDashboard.Padding = new Padding(20, 0, 0, 0);
            btnDashboard.Size = new Size(240, 56);
            btnDashboard.TabIndex = 0;
            btnDashboard.Text = "📊   Dashboard";
            btnDashboard.TextAlign = ContentAlignment.MiddleLeft;
            btnDashboard.UseVisualStyleBackColor = false;
            btnDashboard.Click += btnDashboard_Click;
            // 
            // btnMembers
            // 
            btnMembers.BackColor = Color.FromArgb(15, 23, 42);
            btnMembers.Cursor = Cursors.Hand;
            btnMembers.Dock = DockStyle.Top;
            btnMembers.FlatAppearance.BorderSize = 0;
            btnMembers.FlatAppearance.MouseOverBackColor = Color.FromArgb(37, 99, 235);
            btnMembers.FlatStyle = FlatStyle.Flat;
            btnMembers.Font = new Font("Segoe UI Semibold", 10.5F, FontStyle.Bold, GraphicsUnit.Point, 0);
            btnMembers.ForeColor = Color.FromArgb(226, 232, 240);
            btnMembers.Location = new Point(0, 126);
            btnMembers.Name = "btnMembers";
            btnMembers.Padding = new Padding(20, 0, 0, 0);
            btnMembers.Size = new Size(240, 56);
            btnMembers.TabIndex = 1;
            btnMembers.Text = "👥   Members";
            btnMembers.TextAlign = ContentAlignment.MiddleLeft;
            btnMembers.UseVisualStyleBackColor = false;
            btnMembers.Click += btnMembers_Click;
            // 
            // btnDeposite
            // 
            btnDeposite.BackColor = Color.FromArgb(15, 23, 42);
            btnDeposite.Cursor = Cursors.Hand;
            btnDeposite.Dock = DockStyle.Top;
            btnDeposite.FlatAppearance.BorderSize = 0;
            btnDeposite.FlatAppearance.MouseOverBackColor = Color.FromArgb(37, 99, 235);
            btnDeposite.FlatStyle = FlatStyle.Flat;
            btnDeposite.Font = new Font("Segoe UI Semibold", 10.5F, FontStyle.Bold, GraphicsUnit.Point, 0);
            btnDeposite.ForeColor = Color.FromArgb(226, 232, 240);
            btnDeposite.Location = new Point(0, 182);
            btnDeposite.Name = "btnDeposite";
            btnDeposite.Padding = new Padding(20, 0, 0, 0);
            btnDeposite.Size = new Size(240, 56);
            btnDeposite.TabIndex = 3;
            btnDeposite.Text = "💳   Deposits";
            btnDeposite.TextAlign = ContentAlignment.MiddleLeft;
            btnDeposite.UseVisualStyleBackColor = false;
            btnDeposite.Click += btnDeposite_Click;
            // 
            // btnMarket
            // 
            btnMarket.BackColor = Color.FromArgb(15, 23, 42);
            btnMarket.Cursor = Cursors.Hand;
            btnMarket.Dock = DockStyle.Top;
            btnMarket.FlatAppearance.BorderSize = 0;
            btnMarket.FlatAppearance.MouseOverBackColor = Color.FromArgb(37, 99, 235);
            btnMarket.FlatStyle = FlatStyle.Flat;
            btnMarket.Font = new Font("Segoe UI Semibold", 10.5F, FontStyle.Bold, GraphicsUnit.Point, 0);
            btnMarket.ForeColor = Color.FromArgb(226, 232, 240);
            btnMarket.Location = new Point(0, 238);
            btnMarket.Name = "btnMarket";
            btnMarket.Padding = new Padding(20, 0, 0, 0);
            btnMarket.Size = new Size(240, 56);
            btnMarket.TabIndex = 4;
            btnMarket.Text = "🛒   Market";
            btnMarket.TextAlign = ContentAlignment.MiddleLeft;
            btnMarket.UseVisualStyleBackColor = false;
            btnMarket.Click += btnMarket_Click;
            // 
            // btnMeals
            // 
            btnMeals.BackColor = Color.FromArgb(15, 23, 42);
            btnMeals.Cursor = Cursors.Hand;
            btnMeals.Dock = DockStyle.Top;
            btnMeals.FlatAppearance.BorderSize = 0;
            btnMeals.FlatAppearance.MouseOverBackColor = Color.FromArgb(37, 99, 235);
            btnMeals.FlatStyle = FlatStyle.Flat;
            btnMeals.Font = new Font("Segoe UI Semibold", 10.5F, FontStyle.Bold, GraphicsUnit.Point, 0);
            btnMeals.ForeColor = Color.FromArgb(226, 232, 240);
            btnMeals.Location = new Point(0, 294);
            btnMeals.Name = "btnMeals";
            btnMeals.Padding = new Padding(20, 0, 0, 0);
            btnMeals.Size = new Size(240, 56);
            btnMeals.TabIndex = 5;
            btnMeals.Text = "🍲   Meals";
            btnMeals.TextAlign = ContentAlignment.MiddleLeft;
            btnMeals.UseVisualStyleBackColor = false;
            btnMeals.Click += btnMeals_Click;
            // 
            // btnMonthlyOverview
            // 
            btnMonthlyOverview.BackColor = Color.FromArgb(15, 23, 42);
            btnMonthlyOverview.Cursor = Cursors.Hand;
            btnMonthlyOverview.Dock = DockStyle.Top;
            btnMonthlyOverview.FlatAppearance.BorderSize = 0;
            btnMonthlyOverview.FlatAppearance.MouseOverBackColor = Color.FromArgb(37, 99, 235);
            btnMonthlyOverview.FlatStyle = FlatStyle.Flat;
            btnMonthlyOverview.Font = new Font("Segoe UI Semibold", 10.5F, FontStyle.Bold, GraphicsUnit.Point, 0);
            btnMonthlyOverview.ForeColor = Color.FromArgb(226, 232, 240);
            btnMonthlyOverview.Location = new Point(0, 350);
            btnMonthlyOverview.Name = "btnMonthlyOverview";
            btnMonthlyOverview.Padding = new Padding(20, 0, 0, 0);
            btnMonthlyOverview.Size = new Size(240, 56);
            btnMonthlyOverview.TabIndex = 6;
            btnMonthlyOverview.Text = "📅   Monthly Overview";
            btnMonthlyOverview.TextAlign = ContentAlignment.MiddleLeft;
            btnMonthlyOverview.UseVisualStyleBackColor = false;
            btnMonthlyOverview.Click += btnMonthlyOverview_Click;
            // 
            // btnReports
            // 
            btnReports.BackColor = Color.FromArgb(15, 23, 42);
            btnReports.Cursor = Cursors.Hand;
            btnReports.Dock = DockStyle.Top;
            btnReports.FlatAppearance.BorderSize = 0;
            btnReports.FlatAppearance.MouseOverBackColor = Color.FromArgb(37, 99, 235);
            btnReports.FlatStyle = FlatStyle.Flat;
            btnReports.Font = new Font("Segoe UI Semibold", 10.5F, FontStyle.Bold, GraphicsUnit.Point, 0);
            btnReports.ForeColor = Color.FromArgb(226, 232, 240);
            btnReports.Location = new Point(0, 406);
            btnReports.Name = "btnReports";
            btnReports.Padding = new Padding(20, 0, 0, 0);
            btnReports.Size = new Size(240, 56);
            btnReports.TabIndex = 7;
            btnReports.Text = "📈   Reports";
            btnReports.TextAlign = ContentAlignment.MiddleLeft;
            btnReports.UseVisualStyleBackColor = false;
            btnReports.Click += btnReports_Click;
            // 
            // panelSidebarFooter
            // 
            panelSidebarFooter.BackColor = Color.FromArgb(30, 41, 59);
            panelSidebarFooter.Controls.Add(lblFooterRate);
            panelSidebarFooter.Controls.Add(lblFooterCycle);
            panelSidebarFooter.Dock = DockStyle.Bottom;
            panelSidebarFooter.Location = new Point(0, 649);
            panelSidebarFooter.Name = "panelSidebarFooter";
            panelSidebarFooter.Size = new Size(240, 65);
            panelSidebarFooter.TabIndex = 8;
            // 
            // lblFooterCycle
            // 
            // lblFooterCycle.AutoSize = true;
            // lblFooterCycle.Font = new Font("Segoe UI", 8.5F, FontStyle.Regular, GraphicsUnit.Point, 0);
            // lblFooterCycle.ForeColor = Color.FromArgb(148, 163, 184);
            // lblFooterCycle.Location = new Point(16, 12);
            // lblFooterCycle.Name = "lblFooterCycle";
            // lblFooterCycle.Size = new Size(137, 20);
            // lblFooterCycle.TabIndex = 0;
            // lblFooterCycle.Text = "Active: Nov 2026";
            // 
            // lblFooterRate
            // 
            // lblFooterRate.AutoSize = true;
            // lblFooterRate.Font = new Font("Segoe UI", 9F, FontStyle.Bold, GraphicsUnit.Point, 0);
            // lblFooterRate.ForeColor = Color.FromArgb(52, 211, 153);
            // lblFooterRate.Location = new Point(16, 34);
            // lblFooterRate.Name = "lblFooterRate";
            // lblFooterRate.Size = new Size(149, 20);
            // lblFooterRate.TabIndex = 1;
            // lblFooterRate.Text = "Meal Rate: ৳ 71.64";
            // 
            // panelContent
            // 
            panelContent.AutoScroll = true;
            panelContent.BackColor = Color.FromArgb(248, 250, 252);
            panelContent.Controls.Add(pnlTipCard);
            panelContent.Controls.Add(tblCardsLayout);
            panelContent.Controls.Add(pnlWelcomeHero);
            panelContent.Dock = DockStyle.Fill;
            panelContent.Location = new Point(240, 65);
            panelContent.Name = "panelContent";
            panelContent.Padding = new Padding(35);
            panelContent.Size = new Size(944, 714);
            panelContent.TabIndex = 3;
            // 
            // pnlWelcomeHero
            // 
            pnlWelcomeHero.Anchor = AnchorStyles.Top | AnchorStyles.Left | AnchorStyles.Right;
            pnlWelcomeHero.BackColor = Color.White;
            pnlWelcomeHero.BorderStyle = BorderStyle.FixedSingle;
            pnlWelcomeHero.Controls.Add(lblHeroSub);
            pnlWelcomeHero.Controls.Add(lblHeroTitle);
            pnlWelcomeHero.Controls.Add(lblHeroBadge);
            pnlWelcomeHero.Location = new Point(35, 30);
            pnlWelcomeHero.Name = "pnlWelcomeHero";
            pnlWelcomeHero.Size = new Size(870, 165);
            pnlWelcomeHero.TabIndex = 0;
            // 
            // lblHeroBadge
            // 
            lblHeroBadge.AutoSize = true;
            lblHeroBadge.BackColor = Color.FromArgb(239, 246, 255);
            lblHeroBadge.Font = new Font("Segoe UI", 9F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblHeroBadge.ForeColor = Color.FromArgb(37, 99, 235);
            lblHeroBadge.Location = new Point(25, 20);
            lblHeroBadge.Name = "lblHeroBadge";
            lblHeroBadge.Padding = new Padding(6, 2, 6, 2);
            lblHeroBadge.Size = new Size(211, 24);
            lblHeroBadge.TabIndex = 0;
            lblHeroBadge.Text = "✨ FAST & ACCURATE MESS UI";
            // 
            // lblHeroTitle
            // 
            lblHeroTitle.AutoSize = true;
            lblHeroTitle.Font = new Font("Segoe UI", 20F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblHeroTitle.ForeColor = Color.FromArgb(15, 23, 42);
            lblHeroTitle.Location = new Point(22, 54);
            lblHeroTitle.Name = "lblHeroTitle";
            lblHeroTitle.Size = new Size(628, 46);
            lblHeroTitle.TabIndex = 1;
            lblHeroTitle.Text = "Welcome to Mess Meal Management";
            // 
            // lblHeroSub
            // 
            lblHeroSub.Anchor = AnchorStyles.Top | AnchorStyles.Left | AnchorStyles.Right;
            lblHeroSub.Font = new Font("Segoe UI", 10.5F, FontStyle.Regular, GraphicsUnit.Point, 0);
            lblHeroSub.ForeColor = Color.FromArgb(100, 116, 139);
            lblHeroSub.Location = new Point(25, 106);
            lblHeroSub.Name = "lblHeroSub";
            lblHeroSub.Size = new Size(820, 48);
            lblHeroSub.TabIndex = 2;
            lblHeroSub.Text = "Track daily lunch & dinner, record grocery bazar expenses, handle member deposits, and calculate final settlement balances automatically.";
            // 
            // tblCardsLayout
            // 
            tblCardsLayout.Anchor = AnchorStyles.Top | AnchorStyles.Left | AnchorStyles.Right;
            tblCardsLayout.ColumnCount = 3;
            tblCardsLayout.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 33.33333F));
            tblCardsLayout.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 33.33333F));
            tblCardsLayout.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 33.33334F));
            tblCardsLayout.Controls.Add(pnlCardMeals, 0, 0);
            tblCardsLayout.Controls.Add(pnlCardMarket, 1, 0);
            tblCardsLayout.Controls.Add(pnlCardReports, 2, 0);
            tblCardsLayout.Location = new Point(35, 215);
            tblCardsLayout.Name = "tblCardsLayout";
            tblCardsLayout.RowCount = 1;
            tblCardsLayout.RowStyles.Add(new RowStyle(SizeType.Percent, 100F));
            tblCardsLayout.Size = new Size(870, 185);
            tblCardsLayout.TabIndex = 1;
            // 
            // pnlCardMeals
            // 
            pnlCardMeals.BackColor = Color.White;
            pnlCardMeals.BorderStyle = BorderStyle.FixedSingle;
            pnlCardMeals.Controls.Add(lblCardMealsDesc);
            pnlCardMeals.Controls.Add(lblCardMealsTitle);
            pnlCardMeals.Controls.Add(lblCardMealsIcon);
            pnlCardMeals.Dock = DockStyle.Fill;
            pnlCardMeals.Location = new Point(3, 3);
            pnlCardMeals.Margin = new Padding(3, 3, 10, 3);
            pnlCardMeals.Name = "pnlCardMeals";
            pnlCardMeals.Size = new Size(276, 179);
            pnlCardMeals.TabIndex = 0;
            // 
            // lblCardMealsIcon
            // 
            lblCardMealsIcon.AutoSize = true;
            lblCardMealsIcon.Font = new Font("Segoe UI", 24F, FontStyle.Regular, GraphicsUnit.Point, 0);
            lblCardMealsIcon.Location = new Point(18, 16);
            lblCardMealsIcon.Name = "lblCardMealsIcon";
            lblCardMealsIcon.Size = new Size(73, 54);
            lblCardMealsIcon.TabIndex = 0;
            lblCardMealsIcon.Text = "🍲";
            // 
            // lblCardMealsTitle
            // 
            lblCardMealsTitle.AutoSize = true;
            lblCardMealsTitle.Font = new Font("Segoe UI", 12F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblCardMealsTitle.ForeColor = Color.FromArgb(15, 23, 42);
            lblCardMealsTitle.Location = new Point(20, 75);
            lblCardMealsTitle.Name = "lblCardMealsTitle";
            lblCardMealsTitle.Size = new Size(164, 28);
            lblCardMealsTitle.TabIndex = 1;
            lblCardMealsTitle.Text = "Daily Meal Entry";
            // 
            // lblCardMealsDesc
            // 
            lblCardMealsDesc.Anchor = AnchorStyles.Top | AnchorStyles.Left | AnchorStyles.Right;
            lblCardMealsDesc.Font = new Font("Segoe UI", 9.5F, FontStyle.Regular, GraphicsUnit.Point, 0);
            lblCardMealsDesc.ForeColor = Color.FromArgb(100, 116, 139);
            lblCardMealsDesc.Location = new Point(20, 108);
            lblCardMealsDesc.Name = "lblCardMealsDesc";
            lblCardMealsDesc.Size = new Size(236, 55);
            lblCardMealsDesc.TabIndex = 2;
            lblCardMealsDesc.Text = "Mark lunch and dinner for each member with live daily totals.";
            // 
            // pnlCardMarket
            // 
            pnlCardMarket.BackColor = Color.White;
            pnlCardMarket.BorderStyle = BorderStyle.FixedSingle;
            pnlCardMarket.Controls.Add(lblCardMarketDesc);
            pnlCardMarket.Controls.Add(lblCardMarketTitle);
            pnlCardMarket.Controls.Add(lblCardMarketIcon);
            pnlCardMarket.Dock = DockStyle.Fill;
            pnlCardMarket.Location = new Point(292, 3);
            pnlCardMarket.Margin = new Padding(3, 3, 10, 3);
            pnlCardMarket.Name = "pnlCardMarket";
            pnlCardMarket.Size = new Size(276, 179);
            pnlCardMarket.TabIndex = 1;
            // 
            // lblCardMarketIcon
            // 
            lblCardMarketIcon.AutoSize = true;
            lblCardMarketIcon.Font = new Font("Segoe UI", 24F, FontStyle.Regular, GraphicsUnit.Point, 0);
            lblCardMarketIcon.Location = new Point(18, 16);
            lblCardMarketIcon.Name = "lblCardMarketIcon";
            lblCardMarketIcon.Size = new Size(69, 54);
            lblCardMarketIcon.TabIndex = 0;
            lblCardMarketIcon.Text = "🛒";
            // 
            // lblCardMarketTitle
            // 
            lblCardMarketTitle.AutoSize = true;
            lblCardMarketTitle.Font = new Font("Segoe UI", 12F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblCardMarketTitle.ForeColor = Color.FromArgb(15, 23, 42);
            lblCardMarketTitle.Location = new Point(20, 75);
            lblCardMarketTitle.Name = "lblCardMarketTitle";
            lblCardMarketTitle.Size = new Size(160, 28);
            lblCardMarketTitle.TabIndex = 1;
            lblCardMarketTitle.Text = "Bazar & Expense";
            // 
            // lblCardMarketDesc
            // 
            lblCardMarketDesc.Anchor = AnchorStyles.Top | AnchorStyles.Left | AnchorStyles.Right;
            lblCardMarketDesc.Font = new Font("Segoe UI", 9.5F, FontStyle.Regular, GraphicsUnit.Point, 0);
            lblCardMarketDesc.ForeColor = Color.FromArgb(100, 116, 139);
            lblCardMarketDesc.Location = new Point(20, 108);
            lblCardMarketDesc.Name = "lblCardMarketDesc";
            lblCardMarketDesc.Size = new Size(236, 55);
            lblCardMarketDesc.TabIndex = 2;
            lblCardMarketDesc.Text = "Record daily grocery and shopping vouchers with full item notes.";
            // 
            // pnlCardReports
            // 
            pnlCardReports.BackColor = Color.White;
            pnlCardReports.BorderStyle = BorderStyle.FixedSingle;
            pnlCardReports.Controls.Add(lblCardReportsDesc);
            pnlCardReports.Controls.Add(lblCardReportsTitle);
            pnlCardReports.Controls.Add(lblCardReportsIcon);
            pnlCardReports.Dock = DockStyle.Fill;
            pnlCardReports.Location = new Point(581, 3);
            pnlCardReports.Name = "pnlCardReports";
            pnlCardReports.Size = new Size(286, 179);
            pnlCardReports.TabIndex = 2;
            // 
            // lblCardReportsIcon
            // 
            lblCardReportsIcon.AutoSize = true;
            lblCardReportsIcon.Font = new Font("Segoe UI", 24F, FontStyle.Regular, GraphicsUnit.Point, 0);
            lblCardReportsIcon.Location = new Point(18, 16);
            lblCardReportsIcon.Name = "lblCardReportsIcon";
            lblCardReportsIcon.Size = new Size(69, 54);
            lblCardReportsIcon.TabIndex = 0;
            lblCardReportsIcon.Text = "📊";
            // 
            // lblCardReportsTitle
            // 
            lblCardReportsTitle.AutoSize = true;
            lblCardReportsTitle.Font = new Font("Segoe UI", 12F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblCardReportsTitle.ForeColor = Color.FromArgb(15, 23, 42);
            lblCardReportsTitle.Location = new Point(20, 75);
            lblCardReportsTitle.Name = "lblCardReportsTitle";
            lblCardReportsTitle.Size = new Size(181, 28);
            lblCardReportsTitle.TabIndex = 1;
            lblCardReportsTitle.Text = "Meal Rate & Audit";
            // 
            // lblCardReportsDesc
            // 
            lblCardReportsDesc.Anchor = AnchorStyles.Top | AnchorStyles.Left | AnchorStyles.Right;
            lblCardReportsDesc.Font = new Font("Segoe UI", 9.5F, FontStyle.Regular, GraphicsUnit.Point, 0);
            lblCardReportsDesc.ForeColor = Color.FromArgb(100, 116, 139);
            lblCardReportsDesc.Location = new Point(20, 108);
            lblCardReportsDesc.Name = "lblCardReportsDesc";
            lblCardReportsDesc.Size = new Size(246, 55);
            lblCardReportsDesc.TabIndex = 2;
            lblCardReportsDesc.Text = "Instant settlement ledger showing member dues and refunds.";
            // 
            // pnlTipCard
            // 
            pnlTipCard.Anchor = AnchorStyles.Top | AnchorStyles.Left | AnchorStyles.Right;
            pnlTipCard.BackColor = Color.FromArgb(239, 246, 255);
            pnlTipCard.BorderStyle = BorderStyle.FixedSingle;
            pnlTipCard.Controls.Add(lblTipText);
            pnlTipCard.Controls.Add(lblTipTitle);
            pnlTipCard.Location = new Point(35, 420);
            pnlTipCard.Name = "pnlTipCard";
            pnlTipCard.Size = new Size(870, 75);
            pnlTipCard.TabIndex = 2;
            // 
            // lblTipTitle
            // 
            lblTipTitle.AutoSize = true;
            lblTipTitle.Font = new Font("Segoe UI", 9.5F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblTipTitle.ForeColor = Color.FromArgb(29, 78, 216);
            lblTipTitle.Location = new Point(20, 14);
            lblTipTitle.Name = "lblTipTitle";
            lblTipTitle.Size = new Size(106, 21);
            lblTipTitle.TabIndex = 0;
            lblTipTitle.Text = "💡 Quick Start";
            // 
            // lblTipText
            // 
            lblTipText.Anchor = AnchorStyles.Top | AnchorStyles.Left | AnchorStyles.Right;
            lblTipText.Font = new Font("Segoe UI", 9.5F, FontStyle.Regular, GraphicsUnit.Point, 0);
            lblTipText.ForeColor = Color.FromArgb(30, 64, 175);
            lblTipText.Location = new Point(20, 39);
            lblTipText.Name = "lblTipText";
            lblTipText.Size = new Size(825, 25);
            lblTipText.TabIndex = 1;
            lblTipText.Text = "Click any module on the left sidebar (Dashboard, Members, Deposits, Market, Meals, Reports) to get started.";
            // 
            // MainForm
            // 
            AutoScaleDimensions = new SizeF(8F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(1184, 779);
            Controls.Add(panelContent);
            Controls.Add(panelSidebar);
            Controls.Add(panelHeader);
            MinimumSize = new Size(950, 650);
            Name = "MainForm";
            StartPosition = FormStartPosition.CenterScreen;
            Text = "Mess Meal Management System";
            panelHeader.ResumeLayout(false);
            panelHeader.PerformLayout();
            panelSidebar.ResumeLayout(false);
            panelSidebarFooter.ResumeLayout(false);
            panelSidebarFooter.PerformLayout();
            panelMessBrand.ResumeLayout(false);
            panelMessBrand.PerformLayout();
            panelContent.ResumeLayout(false);
            pnlWelcomeHero.ResumeLayout(false);
            pnlWelcomeHero.PerformLayout();
            tblCardsLayout.ResumeLayout(false);
            pnlCardMeals.ResumeLayout(false);
            pnlCardMeals.PerformLayout();
            pnlCardMarket.ResumeLayout(false);
            pnlCardMarket.PerformLayout();
            pnlCardReports.ResumeLayout(false);
            pnlCardReports.PerformLayout();
            pnlTipCard.ResumeLayout(false);
            pnlTipCard.PerformLayout();
            ResumeLayout(false);
        }

        #endregion
        private Panel panelSidebar;
        private Panel panelContent;
        private Button btnMeals;
        private Button btnMonthlyOverview;
        private Button btnMarket;
        private Button btnDeposite;
        private Button btnMembers;
        private Button btnDashboard;
        private Button btnReports;
        private Label lblTitle;
        private Label lblSubtitle;
        private Panel panelHeader;
        private Panel panelMessBrand;
        private Label lblBrandTitle;
        private Label lblBrandSub;
        private Panel panelSidebarFooter;
        private Label lblFooterCycle;
        private Label lblFooterRate;
        private Panel pnlWelcomeHero;
        private Label lblHeroBadge;
        private Label lblHeroTitle;
        private Label lblHeroSub;
        private TableLayoutPanel tblCardsLayout;
        private Panel pnlCardMeals;
        private Label lblCardMealsIcon;
        private Label lblCardMealsTitle;
        private Label lblCardMealsDesc;
        private Panel pnlCardMarket;
        private Label lblCardMarketIcon;
        private Label lblCardMarketTitle;
        private Label lblCardMarketDesc;
        private Panel pnlCardReports;
        private Label lblCardReportsIcon;
        private Label lblCardReportsTitle;
        private Label lblCardReportsDesc;
        private Panel pnlTipCard;
        private Label lblTipTitle;
        private Label lblTipText;
    }
}
