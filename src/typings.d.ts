/* SystemJS module definition */
declare var module: NodeModule

interface NodeModule {
  id: string
}

/* GLOBAL PARAMS */
declare const PARAMS: {
  API_URI
  API_LOCAL
  API_FIREBASE
}
