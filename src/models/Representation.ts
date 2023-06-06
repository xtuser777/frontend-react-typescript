import { AxiosRequestConfig, isAxiosError } from 'axios';
import axios from '../services/axios';
import { Person } from './person';
import { toast } from 'react-toastify';
import { EnterprisePerson } from './enterprise-person';

export class Representation {
  constructor(
    private _id: number = 0,
    private _register: string = '',
    private _unity: string = '',
    private _person: Person = new Person(),
  ) {}

  get id(): number {
    return this._id;
  }
  set id(v: number) {
    this._id = v;
  }

  get register(): string {
    return this._register;
  }
  set register(v: string) {
    this._register = v;
  }

  get unity(): string {
    return this._unity;
  }
  set unity(v: string) {
    this._unity = v;
  }

  get person(): Person {
    return this._person;
  }
  set person(v: Person) {
    this._person = v;
  }

  save = async () => {
    const payload = {
      address: {
        street: this.person.contact.address.street,
        number: this.person.contact.address.number,
        neighborhood: this.person.contact.address.neighborhood,
        complement: this.person.contact.address.complement,
        code: this.person.contact.address.code,
        city: this.person.contact.address.city.id,
      },
      contact: {
        phone: this.person.contact.phone,
        cellphone: this.person.contact.cellphone,
        email: this.person.contact.email,
      },
      person: {
        corporateName: (this.person.enterprise as EnterprisePerson).corporateName,
        fantasyName: (this.person.enterprise as EnterprisePerson).fantasyName,
        cnpj: (this.person.enterprise as EnterprisePerson).cnpj,
        type: 2,
      },
      representation: {
        register: new Date().toISOString().substring(0, 10),
        unity: this.unity,
      },
    };

    try {
      const response: AxiosRequestConfig = await axios.post('/representation', payload);
      if (response.data.length == 0) {
        toast.success('Representação cadastrada com sucesso!');
        return true;
      } else {
        toast.error(`Erro: ${response.data}`);
        return false;
      }
    } catch (e) {
      if (isAxiosError(e)) toast.error('Erro de requisição: ' + e.response?.data);
      return false;
    }
  };

  async update() {
    const payload = {
      address: {
        street: this.person.contact.address.street,
        number: this.person.contact.address.number,
        neighborhood: this.person.contact.address.neighborhood,
        complement: this.person.contact.address.complement,
        code: this.person.contact.address.code,
        city: this.person.contact.address.city.id,
      },
      contact: {
        phone: this.person.contact.phone,
        cellphone: this.person.contact.cellphone,
        email: this.person.contact.email,
      },
      person: {
        corporateName: (this.person.enterprise as EnterprisePerson).corporateName,
        fantasyName: (this.person.enterprise as EnterprisePerson).fantasyName,
        cnpj: (this.person.enterprise as EnterprisePerson).cnpj,
        type: 2,
      },
      representation: {
        unity: this.unity,
      },
    };
    try {
      const response: AxiosRequestConfig = await axios.put(
        `/representation/${this.id}`,
        payload,
      );
      if (response.data.length == 0) {
        toast.success('Representação atualizada com sucesso!');
        return true;
      } else {
        toast.error(`Erro: ${response.data}`);
        return false;
      }
    } catch (e) {
      if (isAxiosError(e)) toast.error('Erro de requisição: ' + e.response?.data);
      return false;
    }
  }

  async delete() {
    try {
      const response: AxiosRequestConfig = await axios.delete(
        `/representation/${this.id}`,
      );
      if (response.data.length == 0) {
        toast.success('Representação excluída com sucesso!');
        return true;
      } else {
        toast.error(`Erro: ${response.data}`);
        return false;
      }
    } catch (e) {
      if (isAxiosError(e)) toast.error('Erro de requisição: ' + e.response?.data);
      return false;
    }
  }

  async getOne(id: number) {
    try {
      const response = await axios.get(`/representation/${id}`);
      let data;
      if (response.data) data = response.data;
      else return undefined;
      const representation: Representation = new Representation(
        data.id,
        data.register,
        data.unity,
        data.person,
      );

      return representation;
    } catch (err) {
      if (isAxiosError(err)) toast.error('Erro de requisição: ' + err.response?.data);
      return undefined;
    }
  }

  async get() {
    try {
      const response = await axios.get(`/representation`);
      const reps: Representation[] = [];
      for (const data of response.data)
        reps.push(new Representation(data.id, data.register, data.unity, data.person));

      return reps;
    } catch (err) {
      if (isAxiosError(err)) toast.error('Erro de requisição: ' + err.response?.data);
      return [];
    }
  }
}
