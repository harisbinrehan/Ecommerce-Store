import ScriptMethods from './utils/script-methods';

const ScriptActions = async (req, res) => {
  try {
    const { query } = req;
    const { method, ...rest } = query;

    await ScriptMethods({
      method,
      ...rest
    });

    res.send('OK');
  } catch (error) {
    res.send(error.message);
  }
};

export default ScriptActions;
