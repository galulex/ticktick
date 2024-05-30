import { MessageBuilder } from '../shared/message-side'
import Auth from './auth'
import Api from './api'

const messageBuilder = new MessageBuilder();

async function fetchData(ctx) {
  console.log(ctx)
  try {
    // Requesting network data using the fetch API
    // The sample program is for simulation only and does not request real network data, so it is commented here
    // Example of a GET method request
    // const res = await fetch({
    //   url: 'https://xxx.com/api/xxx',
    //   method: 'GET'
    // })
    // Example of a POST method request
    // const res = await fetch({
    //   url: 'https://xxx.com/api/xxx',
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     text: 'Hello Zepp OS'
    //   })
    // })

    // A network request is simulated here, Reference documentation: https://jsonplaceholder.typicode.com/
    const res = await fetch({
      url: 'https://jsonplaceholder.typicode.com/todos/1',
      method: 'GET'
    })
    const resBody = typeof res.body === 'string' ? JSON.parse(res.body) : res.body

    ctx.response({
      data: { result: resBody },
    })

  } catch (error) {
    ctx.response({
      data: { result: "ERROR" },
    });
  }
};

AppSideService({
  onInit() {
    // settings.settingsStorage.setItem('debug', '')
    settings.settingsStorage.addListener('change', async ({ key, newValue, oldValue }) => {
      if (key === 'code' && newValue) {
        await Auth.fetchToken(newValue)
        await Api.projects.index()
      }

      if (key === 'update_at' && newValue) {
        // await Api.projects.create()
        await Api.projects.index()
      }

      if (key === 'command' && newValue === 'vehicles') {
        await dispatch['VEHICLE_DATA']({response: () => {}})
      }
    })

    messageBuilder.listen(() => { });

    messageBuilder.on("request", (ctx) => {
      const jsonRpc = messageBuilder.buf2Json(ctx.request.payload);
      if (jsonRpc.method === "GET_DATA") {
        return fetchData(ctx);
      }
    });
  },

  onRun() { },

  onDestroy() { },
});
