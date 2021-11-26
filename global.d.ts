type Task = {
  id: any;
  task: string;
  department: string;
  startDate: Date;
  endDate: Date;
  owner: string;
  isActive: boolean;
};

interface Department {
  department: string;
  departmentName: string;
}

interface Expense {
       id: any;
       Name: string;
       Amount: string;
       Date: any | undefined;
       Approved?: string;
}

interface EditExpense {
  expense: Expense;
}

interface Timesheet {
  id: any;
  firstname: string;
  lastname: string;
  date: any;
  started: any;
  ended: any ;
  time: any;
}

interface Task {
  id: any;
  task: string;
  owner: string;
  department: any | undefined;
  startDate: any;
  endDate: any;
  isActive: any;
}

interface EditTimesheet {
  timesheet: Timesheet;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  emailAddress?: string;
  phoneNumber: string;
  department: string;
  departmentName: string;
}

interface EditUser {
  user: User;
}
