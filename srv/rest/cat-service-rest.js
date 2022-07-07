const cds = require('@sap/cds');
const xsenv = require("@sap/xsenv");

class CatalogServiceRest extends cds.ApplicationService {
    init() {

        xsenv.loadEnv();

        return super.init();
    }
}

module.exports = { CatalogServiceRest };
