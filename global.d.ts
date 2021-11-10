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
  id: string;
  name: string;
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
