namespace MessMealManagement
{
    partial class MemberForm
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
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
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            DataGridViewCellStyle dataGridViewCellStyle1 = new DataGridViewCellStyle();
            DataGridViewCellStyle dataGridViewCellStyle2 = new DataGridViewCellStyle();
            lblTitle = new Label();
            lblName = new Label();
            lblPhone = new Label();
            txtName = new TextBox();
            txtPhone = new TextBox();
            cmbStatus = new ComboBox();
            label1 = new Label();
            btnAdd = new Button();
            btnUpdate = new Button();
            btnDelete = new Button();
            btnClear = new Button();
            dgvMembers = new DataGridView();
            pnlMemberInput = new Panel();
            lblFormSection = new Label();
            pnlMemberGrid = new Panel();
            lblGridSection = new Label();
            ((System.ComponentModel.ISupportInitialize)dgvMembers).BeginInit();
            pnlMemberInput.SuspendLayout();
            pnlMemberGrid.SuspendLayout();
            SuspendLayout();
            // 
            // lblTitle
            // 
            lblTitle.AutoSize = true;
            lblTitle.Font = new Font("Segoe UI", 16F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblTitle.ForeColor = Color.FromArgb(15, 23, 42);
            lblTitle.Location = new Point(30, 20);
            lblTitle.Name = "lblTitle";
            lblTitle.Size = new Size(349, 37);
            lblTitle.TabIndex = 0;
            lblTitle.Text = "👥 MEMBER MANAGEMENT";
            // 
            // pnlMemberInput
            // 
            pnlMemberInput.Anchor = AnchorStyles.Top | AnchorStyles.Bottom | AnchorStyles.Left;
            pnlMemberInput.BackColor = Color.White;
            pnlMemberInput.BorderStyle = BorderStyle.FixedSingle;
            pnlMemberInput.Controls.Add(lblFormSection);
            pnlMemberInput.Controls.Add(lblName);
            pnlMemberInput.Controls.Add(txtName);
            pnlMemberInput.Controls.Add(lblPhone);
            pnlMemberInput.Controls.Add(txtPhone);
            pnlMemberInput.Controls.Add(label1);
            pnlMemberInput.Controls.Add(cmbStatus);
            pnlMemberInput.Controls.Add(btnAdd);
            pnlMemberInput.Controls.Add(btnUpdate);
            pnlMemberInput.Controls.Add(btnDelete);
            pnlMemberInput.Controls.Add(btnClear);
            pnlMemberInput.Location = new Point(30, 68);
            pnlMemberInput.Name = "pnlMemberInput";
            pnlMemberInput.Size = new Size(330, 550);
            pnlMemberInput.TabIndex = 1;
            // 
            // lblFormSection
            // 
            lblFormSection.AutoSize = true;
            lblFormSection.Font = new Font("Segoe UI", 10F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblFormSection.ForeColor = Color.FromArgb(100, 116, 139);
            lblFormSection.Location = new Point(20, 16);
            lblFormSection.Name = "lblFormSection";
            lblFormSection.Size = new Size(182, 23);
            lblFormSection.TabIndex = 0;
            lblFormSection.Text = "MEMBER DETAILS";
            // 
            // lblName
            // 
            lblName.AutoSize = true;
            lblName.Font = new Font("Segoe UI Semibold", 9.5F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblName.ForeColor = Color.FromArgb(71, 85, 105);
            lblName.Location = new Point(20, 55);
            lblName.Name = "lblName";
            lblName.Size = new Size(89, 21);
            lblName.TabIndex = 1;
            lblName.Text = "Full Name:";
            // 
            // txtName
            // 
            txtName.Anchor = AnchorStyles.Top | AnchorStyles.Left | AnchorStyles.Right;
            txtName.BorderStyle = BorderStyle.FixedSingle;
            txtName.Font = new Font("Segoe UI", 10F, FontStyle.Regular, GraphicsUnit.Point, 0);
            txtName.Location = new Point(20, 80);
            txtName.Name = "txtName";
            txtName.Size = new Size(285, 30);
            txtName.TabIndex = 2;
            // 
            // lblPhone
            // 
            lblPhone.AutoSize = true;
            lblPhone.Font = new Font("Segoe UI Semibold", 9.5F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblPhone.ForeColor = Color.FromArgb(71, 85, 105);
            lblPhone.Location = new Point(20, 125);
            lblPhone.Name = "lblPhone";
            lblPhone.Size = new Size(123, 21);
            lblPhone.TabIndex = 3;
            lblPhone.Text = "Phone Number:";
            // 
            // txtPhone
            // 
            txtPhone.Anchor = AnchorStyles.Top | AnchorStyles.Left | AnchorStyles.Right;
            txtPhone.BorderStyle = BorderStyle.FixedSingle;
            txtPhone.Font = new Font("Segoe UI", 10F, FontStyle.Regular, GraphicsUnit.Point, 0);
            txtPhone.Location = new Point(20, 150);
            txtPhone.Name = "txtPhone";
            txtPhone.Size = new Size(285, 30);
            txtPhone.TabIndex = 4;
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.Font = new Font("Segoe UI Semibold", 9.5F, FontStyle.Bold, GraphicsUnit.Point, 0);
            label1.ForeColor = Color.FromArgb(71, 85, 105);
            label1.Location = new Point(20, 195);
            label1.Name = "label1";
            label1.Size = new Size(59, 21);
            label1.TabIndex = 5;
            label1.Text = "Status:";
            label1.Click += label1_Click;
            // 
            // cmbStatus
            // 
            cmbStatus.Anchor = AnchorStyles.Top | AnchorStyles.Left | AnchorStyles.Right;
            cmbStatus.DropDownStyle = ComboBoxStyle.DropDownList;
            cmbStatus.Font = new Font("Segoe UI", 10F, FontStyle.Regular, GraphicsUnit.Point, 0);
            cmbStatus.FormattingEnabled = true;
            cmbStatus.Items.AddRange(new object[] { "Active", "Inactive" });
            cmbStatus.Location = new Point(20, 220);
            cmbStatus.Name = "cmbStatus";
            cmbStatus.Size = new Size(285, 31);
            cmbStatus.TabIndex = 6;
            // 
            // btnAdd
            // 
            btnAdd.BackColor = Color.FromArgb(37, 99, 235);
            btnAdd.Cursor = Cursors.Hand;
            btnAdd.FlatAppearance.BorderSize = 0;
            btnAdd.FlatStyle = FlatStyle.Flat;
            btnAdd.Font = new Font("Segoe UI Semibold", 9.5F, FontStyle.Bold, GraphicsUnit.Point, 0);
            btnAdd.ForeColor = Color.White;
            btnAdd.Location = new Point(20, 280);
            btnAdd.Name = "btnAdd";
            btnAdd.Size = new Size(135, 38);
            btnAdd.TabIndex = 7;
            btnAdd.Text = "Add Member";
            btnAdd.UseVisualStyleBackColor = false;
            btnAdd.Click += btnAdd_Click;
            // 
            // btnUpdate
            // 
            btnUpdate.BackColor = Color.FromArgb(241, 245, 249);
            btnUpdate.Cursor = Cursors.Hand;
            btnUpdate.FlatAppearance.BorderColor = Color.FromArgb(203, 213, 225);
            btnUpdate.FlatStyle = FlatStyle.Flat;
            btnUpdate.Font = new Font("Segoe UI Semibold", 9.5F, FontStyle.Bold, GraphicsUnit.Point, 0);
            btnUpdate.ForeColor = Color.FromArgb(30, 41, 59);
            btnUpdate.Location = new Point(170, 280);
            btnUpdate.Name = "btnUpdate";
            btnUpdate.Size = new Size(135, 38);
            btnUpdate.TabIndex = 8;
            btnUpdate.Text = "Update";
            btnUpdate.UseVisualStyleBackColor = false;
            btnUpdate.Click += btnUpdate_Click_1;
            // 
            // btnDelete
            // 
            btnDelete.BackColor = Color.FromArgb(254, 242, 242);
            btnDelete.Cursor = Cursors.Hand;
            btnDelete.FlatAppearance.BorderColor = Color.FromArgb(254, 202, 202);
            btnDelete.FlatStyle = FlatStyle.Flat;
            btnDelete.Font = new Font("Segoe UI Semibold", 9.5F, FontStyle.Bold, GraphicsUnit.Point, 0);
            btnDelete.ForeColor = Color.FromArgb(220, 38, 38);
            btnDelete.Location = new Point(20, 330);
            btnDelete.Name = "btnDelete";
            btnDelete.Size = new Size(135, 38);
            btnDelete.TabIndex = 9;
            btnDelete.Text = "Delete";
            btnDelete.UseVisualStyleBackColor = false;
            btnDelete.Click += btnDelete_Click;
            // 
            // btnClear
            // 
            btnClear.BackColor = Color.White;
            btnClear.Cursor = Cursors.Hand;
            btnClear.FlatAppearance.BorderColor = Color.FromArgb(203, 213, 225);
            btnClear.FlatStyle = FlatStyle.Flat;
            btnClear.Font = new Font("Segoe UI Semibold", 9.5F, FontStyle.Bold, GraphicsUnit.Point, 0);
            btnClear.ForeColor = Color.FromArgb(100, 116, 139);
            btnClear.Location = new Point(170, 330);
            btnClear.Name = "btnClear";
            btnClear.Size = new Size(135, 38);
            btnClear.TabIndex = 10;
            btnClear.Text = "Clear";
            btnClear.UseVisualStyleBackColor = false;
            btnClear.Click += btnClear_Click;
            // 
            // pnlMemberGrid
            // 
            pnlMemberGrid.Anchor = AnchorStyles.Top | AnchorStyles.Bottom | AnchorStyles.Left | AnchorStyles.Right;
            pnlMemberGrid.BackColor = Color.White;
            pnlMemberGrid.BorderStyle = BorderStyle.FixedSingle;
            pnlMemberGrid.Controls.Add(lblGridSection);
            pnlMemberGrid.Controls.Add(dgvMembers);
            pnlMemberGrid.Location = new Point(380, 68);
            pnlMemberGrid.Name = "pnlMemberGrid";
            pnlMemberGrid.Size = new Size(500, 550);
            pnlMemberGrid.TabIndex = 2;
            // 
            // lblGridSection
            // 
            lblGridSection.AutoSize = true;
            lblGridSection.Font = new Font("Segoe UI", 10F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblGridSection.ForeColor = Color.FromArgb(100, 116, 139);
            lblGridSection.Location = new Point(15, 16);
            lblGridSection.Name = "lblGridSection";
            lblGridSection.Size = new Size(250, 23);
            lblGridSection.TabIndex = 0;
            lblGridSection.Text = "REGISTERED MEMBERS LIST";
            // 
            // dgvMembers
            // 
            dgvMembers.AllowUserToAddRows = false;
            dgvMembers.AllowUserToDeleteRows = false;
            dgvMembers.AllowUserToResizeRows = false;
            dgvMembers.Anchor = AnchorStyles.Top | AnchorStyles.Bottom | AnchorStyles.Left | AnchorStyles.Right;
            dgvMembers.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill;
            dgvMembers.BackgroundColor = Color.White;
            dgvMembers.BorderStyle = BorderStyle.None;
            dgvMembers.CellBorderStyle = DataGridViewCellBorderStyle.SingleHorizontal;
            dgvMembers.ColumnHeadersBorderStyle = DataGridViewHeaderBorderStyle.None;
            dataGridViewCellStyle1.Alignment = DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle1.BackColor = Color.FromArgb(241, 245, 249);
            dataGridViewCellStyle1.Font = new Font("Segoe UI Semibold", 9.5F, FontStyle.Bold, GraphicsUnit.Point, 0);
            dataGridViewCellStyle1.ForeColor = Color.FromArgb(71, 85, 105);
            dataGridViewCellStyle1.SelectionBackColor = Color.FromArgb(241, 245, 249);
            dataGridViewCellStyle1.SelectionForeColor = Color.FromArgb(71, 85, 105);
            dataGridViewCellStyle1.WrapMode = DataGridViewTriState.True;
            dgvMembers.ColumnHeadersDefaultCellStyle = dataGridViewCellStyle1;
            dgvMembers.ColumnHeadersHeight = 36;
            dgvMembers.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.DisableResizing;
            dataGridViewCellStyle2.Alignment = DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle2.BackColor = Color.White;
            dataGridViewCellStyle2.Font = new Font("Segoe UI", 9F, FontStyle.Regular, GraphicsUnit.Point, 0);
            dataGridViewCellStyle2.ForeColor = Color.FromArgb(15, 23, 42);
            dataGridViewCellStyle2.SelectionBackColor = Color.FromArgb(239, 246, 255);
            dataGridViewCellStyle2.SelectionForeColor = Color.FromArgb(15, 23, 42);
            dataGridViewCellStyle2.WrapMode = DataGridViewTriState.False;
            dgvMembers.DefaultCellStyle = dataGridViewCellStyle2;
            dgvMembers.EnableHeadersVisualStyles = false;
            dgvMembers.GridColor = Color.FromArgb(226, 232, 240);
            dgvMembers.Location = new Point(15, 50);
            dgvMembers.MultiSelect = false;
            dgvMembers.Name = "dgvMembers";
            dgvMembers.ReadOnly = true;
            dgvMembers.RowHeadersVisible = false;
            dgvMembers.RowHeadersWidth = 51;
            dgvMembers.RowTemplate.Height = 34;
            dgvMembers.SelectionMode = DataGridViewSelectionMode.FullRowSelect;
            dgvMembers.Size = new Size(468, 480);
            dgvMembers.TabIndex = 11;
            dgvMembers.CellClick += dgvMembers_CellClick;
            // 
            // MemberForm
            // 
            AutoScaleDimensions = new SizeF(8F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            AutoScroll = true;
            BackColor = Color.FromArgb(248, 250, 252);
            ClientSize = new Size(911, 640);
            Controls.Add(pnlMemberGrid);
            Controls.Add(pnlMemberInput);
            Controls.Add(lblTitle);
            MinimumSize = new Size(700, 500);
            Name = "MemberForm";
            Text = "Member Management";
            ((System.ComponentModel.ISupportInitialize)dgvMembers).EndInit();
            pnlMemberInput.ResumeLayout(false);
            pnlMemberInput.PerformLayout();
            pnlMemberGrid.ResumeLayout(false);
            pnlMemberGrid.PerformLayout();
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private Label lblTitle;
        private Label lblName;
        private Label lblPhone;
        private TextBox txtName;
        private TextBox txtPhone;
        private ComboBox cmbStatus;
        private Label label1;
        private Button btnAdd;
        private Button btnUpdate;
        private Button btnDelete;
        private Button btnClear;
        private DataGridView dgvMembers;
        private Panel pnlMemberInput;
        private Label lblFormSection;
        private Panel pnlMemberGrid;
        private Label lblGridSection;
    }
}
