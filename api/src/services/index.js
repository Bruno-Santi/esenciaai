const allServices = {
  user: {},
  auth:{},
};

const getServices = (name) => {
  return allServices[name];
};

const addServices = (name, services) => {
  allServices[name] = services;
};

module.exports = { getServices, addServices };
