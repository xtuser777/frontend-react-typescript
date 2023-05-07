import { toast } from 'react-toastify';
import axios from '../services/axios';
import { Employee } from './employee';
import { IndividualPerson } from './individual-person';
import { Level } from './level';
import { isAxiosError } from 'axios';

export class User {
  constructor(
    private _id: number = 0,
    private _login: string = '',
    private _password: string | undefined = undefined,
    private _active: boolean = false,
    private _employee: Employee = new Employee(),
    private _level: Level = new Level(),
  ) {}

  get id(): number {
    return this._id;
  }
  set id(v: number) {
    this._id = v;
  }

  get login(): string {
    return this._login;
  }
  set login(v: string) {
    this._login = v;
  }

  get password(): string | undefined {
    return this._password;
  }
  set password(v: string | undefined) {
    this._password = v;
  }

  get active(): boolean {
    return this._active;
  }
  set active(v: boolean) {
    this._active = v;
  }

  get employee(): Employee {
    return this._employee;
  }
  set employee(v: Employee) {
    this._employee = v;
  }

  get level(): Level {
    return this._level;
  }
  set level(v: Level) {
    this._level = v;
  }

  async save() {
    try {
      const response = await axios.post('/employee', {
        address: {
          street: (this.employee.person as IndividualPerson).contact.address.street,
          number: (this.employee.person as IndividualPerson).contact.address.number,
          neighborhood: (this.employee.person as IndividualPerson).contact.address
            .neighborhood,
          complement: (this.employee.person as IndividualPerson).contact.address
            .complement,
          code: (this.employee.person as IndividualPerson).contact.address.code,
          city: (this.employee.person as IndividualPerson).contact.address.city.id,
        },
        contact: {
          phone: (this.employee.person as IndividualPerson).contact.phone,
          cellphone: (this.employee.person as IndividualPerson).contact.cellphone,
          email: (this.employee.person as IndividualPerson).contact.email,
        },
        person: {
          name: (this.employee.person as IndividualPerson).name,
          rg: (this.employee.person as IndividualPerson).rg,
          cpf: (this.employee.person as IndividualPerson).cpf,
          birthDate: (this.employee.person as IndividualPerson).birthDate,
        },
        employee: {
          type: this.employee.type,
          admission: this.employee.admission,
        },
        user: {
          login: this.login,
          password: this.password,
          level: this.level.id,
        },
      });
      if (response.data.length == 0) {
        toast.success('Funcionário cadastrado com sucesso!');
        return true;
      } else {
        toast.error(`Erro: ${response.data}`);
        return false;
      }
    } catch (err) {
      if (isAxiosError(err)) toast.error('Erro de requisição: ' + err.response?.data);
      return false;
    }
  }

  async update() {
    try {
      const response = await axios.put(`/employee/${this.id}`, {
        address: {
          street: (this.employee.person as IndividualPerson).contact.address.street,
          number: (this.employee.person as IndividualPerson).contact.address.number,
          neighborhood: (this.employee.person as IndividualPerson).contact.address
            .neighborhood,
          complement: (this.employee.person as IndividualPerson).contact.address
            .complement,
          code: (this.employee.person as IndividualPerson).contact.address.code,
          city: (this.employee.person as IndividualPerson).contact.address.city.id,
        },
        contact: {
          phone: (this.employee.person as IndividualPerson).contact.phone,
          cellphone: (this.employee.person as IndividualPerson).contact.cellphone,
          email: (this.employee.person as IndividualPerson).contact.email,
        },
        person: {
          name: (this.employee.person as IndividualPerson).name,
          rg: (this.employee.person as IndividualPerson).rg,
          cpf: (this.employee.person as IndividualPerson).cpf,
          birthDate: (this.employee.person as IndividualPerson).birthDate,
        },
        employee: {
          type: this.employee.type,
          admission: this.employee.admission,
        },
        user: {
          login: this.login,
          password: this.password,
          level: this.level.id,
        },
      });
      if (response.data.length == 0) {
        toast.success('Funcionário atualizado com sucesso!');
        return true;
      } else {
        toast.error(`Erro: ${response.data}`);
        return false;
      }
    } catch (err) {
      if (isAxiosError(err)) toast.error('Erro de requisição: ' + err.response?.data);
    }
  }

  async desativar() {
    try {
      const response = await axios.put(`/employee/${this.id}`, {
        address: {
          street: (this.employee.person as IndividualPerson).contact.address.street,
          number: (this.employee.person as IndividualPerson).contact.address.number,
          neighborhood: (this.employee.person as IndividualPerson).contact.address
            .neighborhood,
          complement: (this.employee.person as IndividualPerson).contact.address
            .complement,
          code: (this.employee.person as IndividualPerson).contact.address.code,
          city: (this.employee.person as IndividualPerson).contact.address.city.id,
        },
        contact: {
          phone: (this.employee.person as IndividualPerson).contact.phone,
          cellphone: (this.employee.person as IndividualPerson).contact.cellphone,
          email: (this.employee.person as IndividualPerson).contact.email,
        },
        person: {
          name: (this.employee.person as IndividualPerson).name,
          rg: (this.employee.person as IndividualPerson).rg,
          cpf: (this.employee.person as IndividualPerson).cpf,
          birthDate: (this.employee.person as IndividualPerson).birthDate,
        },
        employee: {
          type: this.employee.type,
          admission: this.employee.admission,
          demission: new Date().toISOString().substring(0, 10),
        },
        user: {
          login: this.login,
          password: this.password,
          active: false,
          level: this.level.id,
        },
      });
      if (response.data.length == 0) {
        toast.success('Funcionário desativado com sucesso!');
        return true;
      } else {
        toast.error(`Erro: ${response.data}`);
        return false;
      }
    } catch (err) {
      if (isAxiosError(err)) toast.error('Erro de requisição: ' + err.response?.data);
    }
  }

  async reativar() {
    try {
      const response = await axios.put(`/employee/${this.id}`, {
        address: {
          street: (this.employee.person as IndividualPerson).contact.address.street,
          number: (this.employee.person as IndividualPerson).contact.address.number,
          neighborhood: (this.employee.person as IndividualPerson).contact.address
            .neighborhood,
          complement: (this.employee.person as IndividualPerson).contact.address
            .complement,
          code: (this.employee.person as IndividualPerson).contact.address.code,
          city: (this.employee.person as IndividualPerson).contact.address.city.id,
        },
        contact: {
          phone: (this.employee.person as IndividualPerson).contact.phone,
          cellphone: (this.employee.person as IndividualPerson).contact.cellphone,
          email: (this.employee.person as IndividualPerson).contact.email,
        },
        person: {
          name: (this.employee.person as IndividualPerson).name,
          rg: (this.employee.person as IndividualPerson).rg,
          cpf: (this.employee.person as IndividualPerson).cpf,
          birthDate: (this.employee.person as IndividualPerson).birthDate,
        },
        employee: {
          type: this.employee.type,
          admission: this.employee.admission,
          demission: undefined,
        },
        user: {
          login: this.login,
          password: this.password,
          active: true,
          level: this.level.id,
        },
      });
      if (response.data.length == 0) {
        toast.success('Funcionário reativado com sucesso!');
        return true;
      } else {
        toast.error(`Erro: ${response.data}`);
        return false;
      }
    } catch (err) {
      if (isAxiosError(err)) toast.error('Erro de requisição: ' + err.response?.data);
    }
  }

  async delete() {
    try {
      const response = await axios.delete(`/employee/${this.id}`);
      if (response.data.length == 0) {
        toast.success('Funcionário excluído com sucesso!');
        return true;
      } else {
        toast.error(`Erro: ${response.data}`);
        return false;
      }
    } catch (err) {
      if (isAxiosError(err)) toast.error('Erro de requisição: ' + err.response?.data);
    }
  }

  async getOne(id: number) {
    try {
      const response = await axios.get(`/employee/${id}`);
      const user: User = response.data;

      return user;
    } catch (err) {
      if (isAxiosError(err)) toast.error('Erro de requisição: ' + err.response?.data);
      return undefined;
    }
  }

  async get() {
    try {
      const response = await axios.get(`/employee`);
      const users: User[] = response.data;

      return users;
    } catch (err) {
      if (isAxiosError(err)) toast.error('Erro de requisição: ' + err.response?.data);
      return [];
    }
  }
}
