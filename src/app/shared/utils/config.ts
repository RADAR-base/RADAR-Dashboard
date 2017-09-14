import { Config } from '../models/config.model'

// TODO: move remote config and language to store
export class AppConfig {
  static language = 'EN'
  static config: Config
}
