import { envs } from '../src/config/env';
import { serverapp } from '../src/presentation/server';

jest.mock('../src/presentation/server');





// probar la inicializacion de la app
describe('App tests', () => {
    test('Sample test', async () => {
        await import('../src/app');


        expect(serverapp).toHaveBeenCalledWith({
            port: envs.PORT,
            publicPath: envs.PUBLIC_PATH,
            router: expect.any(Function)
        });

        expect(serverapp.prototype.start).toHaveBeenCalledTimes(1);



    });


});