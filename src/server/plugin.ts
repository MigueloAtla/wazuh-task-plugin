import {
  PluginInitializerContext,
  CoreSetup,
  CoreStart,
  Plugin,
  Logger,
} from '../../../src/core/server';

import { 
  CustomPluginPluginSetup, 
  CustomPluginPluginStart, 
  CustomPluginPluginSetupDeps,
  CustomPluginPluginStartDeps
 } from './types';
import { defineRoutes } from './routes';

export class CustomPluginPlugin
  implements Plugin<
  CustomPluginPluginSetup, 
  CustomPluginPluginStart,
  CustomPluginPluginSetupDeps,
  CustomPluginPluginStartDeps
  > {
  private readonly logger: Logger;

  constructor(initializerContext: PluginInitializerContext) {
    this.logger = initializerContext.logger.get();
  }

  public setup(core: CoreSetup<CustomPluginPluginStartDeps>, deps: CustomPluginPluginSetupDeps) {
    this.logger.debug('custom_plugin: Setup');
    const router = core.http.createRouter();

    core.getStartServices().then(([_, depsStart]) => {
      // registerRoutes(router, depsStart.data);
      defineRoutes(router, depsStart.data);
    });
    
    // Register server side APIs
    // defineRoutes(router);

    return {};
  }

  public start(core: CoreStart) {
    this.logger.debug('custom_plugin: Started');
    return {};
  }

  public stop() {}
}
