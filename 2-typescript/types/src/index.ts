type Pager = {
  name: string,
  contact: number,
};

type Phone = {
  name: string,
  contact: string,
};

type CallablePager = Pager & Phone;
