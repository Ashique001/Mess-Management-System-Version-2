using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace MessMealManagement
{
    public partial class MainForm : Form
    {
        public MainForm()
        {
            InitializeComponent();

        }
        private void SetActiveButton(Button activeButton)
        {
            Button[] navButtons = { btnDashboard, btnMembers, btnDeposite, btnMarket, btnMeals, btnMonthlyOverview, btnReports };
            foreach (var btn in navButtons)
            {
                btn.BackColor = Color.FromArgb(15, 23, 42);
                btn.ForeColor = Color.FromArgb(226, 232, 240);
            }
            if (activeButton != null)
            {
                activeButton.BackColor = Color.FromArgb(37, 99, 235);
                activeButton.ForeColor = Color.White;
            }
        }

        private void LoadForm(Form form, Button navButton)
        {
            SetActiveButton(navButton);
            panelContent.Controls.Clear();

            form.TopLevel = false;
            form.FormBorderStyle = FormBorderStyle.None;
            form.Dock = DockStyle.Fill;

            panelContent.Controls.Add(form);

            form.Show();
        }

        //Form Load
        private void btnMembers_Click(object sender, EventArgs e)
        {
            LoadForm(new MemberForm(), btnMembers);
        }
        private void btnDashboard_Click(object sender, EventArgs e)
        {
            LoadForm(new DashboardForm(), btnDashboard);
        }

        private void lblMembersTitle_Click(object sender, EventArgs e)
        {

        }

        private void btnDeposite_Click(object sender, EventArgs e)
        {
            LoadForm(new DepositeForm(), btnDeposite);
        }

        private void btnMarket_Click(object sender, EventArgs e)
        {
            LoadForm(new MarketForm(), btnMarket);
        }

        private void btnMeals_Click(object sender, EventArgs e)
        {
            LoadForm(new MealsForm(), btnMeals);
        }

        private void btnMonthlyOverview_Click(object sender, EventArgs e)
        {
            LoadForm(new MonthlyOverviewForm(), btnMonthlyOverview);
        }

        private void btnReports_Click(object sender, EventArgs e)
        {
            LoadForm(new ReportForm(), btnReports);
        }
    }
}
