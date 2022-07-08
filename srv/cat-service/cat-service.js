const cds = require('@sap/cds');
const xsenv = require("@sap/xsenv");


class CatalogService extends cds.ApplicationService {
    init() {
    
        //----------------------------------------------------------------------------------//
        //----------------------------------------------------------------------------------//
        //----------------------------------------------------------------------------------//
        // Function - checkDate                                                                  //
        //----------------------------------------------------------------------------------//
        //----------------------------------------------------------------------------------//
        //----------------------------------------------------------------------------------//
        this.on('getMatrix',  async (req) => {
            const tx    = cds.transaction(req);
             
  
            try {
                let aMaterial = await tx.read(cds.services.CatalogService.entities.ProdutosCrud,          
                    Produtos => {
                        Produtos("*");
                        Produtos.composicao(
                            (composicao) => {
                                composicao("*");
                                composicao.principioAtivo(
                                    (principioAtivo) => {
                                        principioAtivo("nomePrincipioAtivo");
                                        principioAtivo("nomePrincipioAtivoComum");
                                    }
                                )
                            }
                        );
                        Produtos.pragas(
                            (pragas) => {        
                                pragas.praga(
                                    (praga) =>{
                                        praga("nomePraga");
                                        praga("nomePragaCientifico");
                                    }
                                );
                                pragas.cultura(
                                    (cultura)=> {
                                        cultura("nomeCultura")
                                    }
                                );
                                pragas("*");
                            }
                        );
                    }
                ).where({
                    ID: req.data.ID,
                });
                

                if (aMaterial.length > 0) {
                    return true;
                }
                
            } catch (error) {
                return false;
            }
            return false;
        }); 

        return super.init();
    }
}

module.exports = { CatalogService };
