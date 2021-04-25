// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { BadRequest } = require('@feathersjs/errors');

module.exports = (schema) => {
  return async context => {
    if (!context.params.provider) {
      return context;
    }

    try {
      const data = await schema.validate(context.data);
      return {
        ...context,
        data,
      };
    } catch (e) {
      throw new BadRequest(e);
    }
  };
};
