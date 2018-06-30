import './indexed_db';
import './local_storage';
import { browserFiles } from './browser_files';
import { browserHTTPRequest } from './browser_http';
import { concatenateArrayBuffers, decodeWeights, encodeWeights, getModelArtifactsInfoForJSON } from './io_utils';
import { ModelManagement } from './model_management';
import { IORouterRegistry } from './router_registry';
import { IOHandler, LoadHandler, ModelArtifacts, ModelStoreManager, SaveConfig, SaveHandler, SaveResult, WeightsManifestConfig, WeightsManifestEntry } from './types';
import { loadWeights } from './weights_loader';
declare const registerSaveRouter: typeof IORouterRegistry.registerSaveRouter;
declare const registerLoadRouter: typeof IORouterRegistry.registerLoadRouter;
declare const getSaveHandlers: typeof IORouterRegistry.getSaveHandlers;
declare const getLoadHandlers: typeof IORouterRegistry.getLoadHandlers;
declare const copyModel: typeof ModelManagement.copyModel;
declare const listModels: typeof ModelManagement.listModels;
declare const moveModel: typeof ModelManagement.moveModel;
declare const removeModel: typeof ModelManagement.removeModel;
export { browserFiles, browserHTTPRequest, concatenateArrayBuffers, copyModel, decodeWeights, encodeWeights, getLoadHandlers, getModelArtifactsInfoForJSON, getSaveHandlers, IOHandler, listModels, LoadHandler, loadWeights, ModelArtifacts, ModelStoreManager, moveModel, registerLoadRouter, registerSaveRouter, removeModel, SaveConfig, SaveHandler, SaveResult, WeightsManifestConfig, WeightsManifestEntry };
