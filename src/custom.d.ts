export {};
declare global {
  module "*.svg" {
    const content: any;
    export default content;
  }
}
