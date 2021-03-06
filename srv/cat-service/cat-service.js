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
            let aMaterial = [],
                aMaterialComp = [],
                aComposicao = [],  //VALORES MATERIAL DE REFERENCIA PARA COMPOSICAO
                aPragas = [],      //VALORES MATERIAL DE REFERENCIA PARA PRAGAS
                aComp = [];        //ARRAY PARA COMPARAÇÃO DE COMPOSICAO E PRAGAS
                
               
                

                
            try {
                //MATERIAL PRINCIPAL
                aMaterial = await tx.read(cds.services.CatalogService.entities.ProdutosCrud,          
                    Produtos => {
                        Produtos("ID");
                        Produtos("nomeProduto");
                        Produtos("cdProduto");
                        Produtos.composicao(
                            (composicao) => {
                                composicao.principioAtivo(
                                    (principioAtivo) => {
                                        principioAtivo("ID");
                                        principioAtivo("nomePrincipioAtivo");
                                        principioAtivo("nomePrincipioAtivoComum");
                                    }
                                );
                                composicao("qtdGL");
                                composicao("perMassa");

                            }
                        );
                        Produtos.pragas(
                            (pragas) => { 
                                pragas.cultura(
                                    (cultura)=> {
                                        cultura("ID");
                                        cultura("nomeCultura");
                                    }
                                );       
                                pragas.praga(
                                    (praga) =>{
                                        praga("ID");
                                        praga("nomePraga");
                                        praga("nomePragaCientifico");
                                    }
                                );
                                pragas("doseMin");
                                pragas("doseMax");
                                pragas("volApliTerrestreMin");
                                pragas("volApliTerrestreMax");
                            }
                        );
                    }
                ).where({
                    ID: req.data.ID,
                })
                

                if (aMaterial.length > 0) {
                    
                    for (let composicao of aMaterial[0].composicao) {
                        aComposicao.push({ 
                            ID:                 aMaterial[0].ID,
                            nomeProduto:        aMaterial[0].nomeProduto,
                            cdProduto:          aMaterial[0].cdProduto,
                            IDprincipioAtivo:   composicao.principioAtivo.ID,
                            nomePrincipioAtivo: composicao.principioAtivo.nomePrincipioAtivo,
                            qtdGL:              composicao.qtdGL,
                            perMassa:           composicao.perMassa
                        })
                    };

                    for (let pragas of aMaterial[0].pragas) {
                        aPragas.push({ 
                            ID:                  aMaterial[0].ID,
                            nomeProduto:         aMaterial[0].nomeProduto,
                            cdProduto:           aMaterial[0].cdProduto,
                            IDcultura:           pragas.cultura.ID,
                            nomeCultura:         pragas.cultura.nomeCultura,
                            IDpraga:             pragas.praga.ID,
                            nomePraga:           pragas.praga.nomePraga,
                            nomePragaCientifico: pragas.praga.nomePragaCientifico,
                            dose:                (pragas.doseMin == pragas.doseMax ? pragas.doseMin : `${pragas.doseMin} - ${pragas.doseMax}`),
                            volApli:             (pragas.volApliTerrestreMin == pragas.volApliTerrestreMax ? pragas.volApliTerrestreMin : `${pragas.volApliTerrestreMin} - ${pragas.volApliTerrestreMax}`)              
                            //doseMin:             pragas.doseMin,
                            //doseMax:             pragas.doseMax,
                            //volApliTerrestreMin: pragas.volApliTerrestreMin,
                            //volApliTerrestreMax: pragas.volApliTerrestreMax
                        })
                    };
                }
                //MATERIAIS PARA COMPARAÇÃO NA MATRIZ 
                aMaterialComp = await tx.read(cds.services.CatalogService.entities.ProdutosCrud,          
                    Produtos => {
                        Produtos("ID");
                        Produtos("nomeProduto");
                        Produtos("cdProduto");
                        Produtos.composicao(
                            (composicao) => {
                                composicao.principioAtivo(
                                    (principioAtivo) => {
                                        principioAtivo("ID");
                                        principioAtivo("nomePrincipioAtivo");
                                        principioAtivo("nomePrincipioAtivoComum");
                                    }
                                );
                                composicao("qtdGL");
                                composicao("perMassa");

                            }
                        );
                        Produtos.pragas(
                            (pragas) => { 
                                pragas.cultura(
                                    (cultura)=> {
                                        cultura("ID");
                                        cultura("nomeCultura");
                                    }
                                );       
                                pragas.praga(
                                    (praga) =>{
                                        praga("ID");
                                        praga("nomePraga");
                                        praga("nomePragaCientifico");
                                    }
                                );
                                pragas("doseMin");
                                pragas("doseMax");
                                pragas("volApliTerrestreMin");
                                pragas("volApliTerrestreMax");
                            }
                        );
                    }
                ).where({
                    ID: {
                        '<>': req.data.ID
                    },
                })
                

                if (aMaterialComp.length > 0) {
                    for (let material of aMaterialComp){
                        let aCompTemp = {
                            ID:                 material.ID,
                            nomeProduto:        material.nomeProduto,
                            cdProduto:          material.cdProduto,
                            composicao:    [],
                            pragas:            []
                        };

                        for (let composicao of material.composicao) {
                            aCompTemp.composicao.push({ 
                                IDprincipioAtivo:   composicao.principioAtivo.ID,
                                nomePrincipioAtivo: composicao.principioAtivo.nomePrincipioAtivo,
                                qtdGL:              composicao.qtdGL,
                                perMassa:           composicao.perMassa
                            })
                        };

                        for (let pragas of material.pragas) {
                            let dose = 
                            aCompTemp.pragas.push({ 
                                IDcultura:           pragas.cultura.ID,
                                nomeCultura:         pragas.cultura.nomeCultura,
                                IDpraga:             pragas.praga.ID,
                                nomePraga:           pragas.praga.nomePraga,
                                nomePragaCientifico: pragas.praga.nomePragaCientifico,
                                dose:                (pragas.doseMin == pragas.doseMax ? pragas.doseMin : `${pragas.doseMin} - ${pragas.doseMax}`),
                                volApli:             (pragas.volApliTerrestreMin == pragas.volApliTerrestreMax ? pragas.volApliTerrestreMin : `${pragas.volApliTerrestreMin} - ${pragas.volApliTerrestreMax}`)      
                                //doseMin:             pragas.doseMin,
                                //doseMax:             pragas.doseMax,
                                //volApliTerrestreMin: pragas.volApliTerrestreMin,
                                //volApliTerrestreMax: pragas.volApliTerrestreMax
                            })
                        };
                        aComp.push(aCompTemp);
                    }
                }
                //Montando a Matriz de Composição
                
                let composicaoHeader = { 
                        Col1: "Princípio Ativo",
                        Col2: aMaterial[0].nomeProduto,
                        Col2_1: "Qtd(g/L)",   
                        Col2_2: "%(m/v)"       
                    },
                    aComposicaoItem = [];

                    // Linhas dos itens principais
                for (let composicao of aComposicao) {
                    aComposicaoItem.push({
                        IDprincipioAtivo:   composicao.IDprincipioAtivo,
                        nomePrincipioAtivo: composicao.nomePrincipioAtivo,
                        qtdGL1:              composicao.qtdGL,
                        perMassa1:           composicao.perMassa
                    })
                }


                let index_header = 2;
                let index = 1;
                for (let comp of aComp) { //Lendo os materiais que irão ser comparados
                    index++ ;
                    index_header++;
                        
                    for (let composicaoComp of comp.composicao){     
                        for (let composicaoItem of aComposicaoItem) {
                            if (composicaoItem.IDprincipioAtivo == composicaoComp.IDprincipioAtivo) {
                                //HEADER
                                composicaoHeader[`Col${index_header}`]   = comp.nomeProduto;
                                composicaoHeader[`Col${index_header}_1`] = "Qtd(g/L)";
                                composicaoHeader[`Col${index_header}_2`] = "%(m/v)";
                                //VALORES
                                composicaoItem[`qtdGL${index}`]          = composicaoComp.qtdGL;
                                composicaoItem[`perMassa${index}`]       = composicaoComp.perMassa;     
                            }
                        }
                    }
                }

                //Montando a Matriz de Pragas
                
                let pragasHeader = { 
                        Col0: "Cultura" ,
                        Col1: "Praga",
                        Col2: aMaterial[0].nomeProduto,
                        Col2_1: "Dose",   
                        Col2_2: "Vol.Aplicação"  
                    },
                    aPragasItem = [];

                    // Linhas dos itens principais
                for (let pragas of aPragas) {
                    aPragasItem.push({
                        IDcultura:           pragas.IDcultura,
                        nomeCultura:         pragas.nomeCultura,
                        IDpraga:             pragas.IDpraga,
                        nomePragaCientifico: pragas.nomePragaCientifico,
                        dose1:                pragas.dose,
                        volApli1:             pragas.volApli
                    })
                }


                    index_header = 2;
                    index = 1;
                for (let comp of aComp) { //Lendo os materiais que irão ser comparados
                    index++ ;
                    index_header++;
                        
                    for (let pragasComp of comp.pragas){     
                        for (let pragasItem of aPragasItem) {
                            if (pragasItem.IDcultura == pragasComp.IDcultura && pragasItem.IDpraga == pragasComp.IDpraga) {
                                //HEADER
                                pragasHeader[`Col${index_header}`]   = comp.nomeProduto;
                                pragasHeader[`Col${index_header}_1`] = "Dose";
                                pragasHeader[`Col${index_header}_2`] = "Vol.Aplicação";
                                //VALORES
                                pragasItem[`dose${index}`]          = pragasComp.dose;
                                pragasItem[`volApli${index}`]       = pragasComp.volApli;     
                            }
                        }
                    }
                }


                return JSON.stringify({
                    composicaoHeader: composicaoHeader,
                    composicaoItem:   aComposicaoItem,
                    composicaoRows:   aComposicaoItem.length,
                    composicaoSpan1:  `${Object.keys(composicaoHeader).length},1`,
                    composicaoSpan2:  `${Object.keys(composicaoHeader).length},2`,
                    pragasHeader:     pragasHeader,
                    pragasItem:       aPragasItem,
                    pragasRows:       aPragasItem.length,
                    pragasSpan1:      `${Object.keys(pragasHeader).length},1`,
                    pragasSpan2:      `${Object.keys(pragasHeader).length},2`,
                });
                  
                
            } catch (error) {
                return false;
            }
            return false;
        }); 

        return super.init();
    }
}

module.exports = { CatalogService };
