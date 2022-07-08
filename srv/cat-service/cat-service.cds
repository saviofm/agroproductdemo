using agroproductdemo as agroproductdemo from '../../db/data-model';

service CatalogService {

    //For fiori elements
    @odata.draft.enabled
    entity Produtos as projection on agroproductdemo.Produtos {
        *,
        composicao: redirected to Composicao,
        pragas: redirected to ProdutoPragas,
    };


    entity Composicao as projection on agroproductdemo.Composicao {
        *,
        produto: redirected to Produtos,
        principioAtivo: redirected to PrincipiosAtivos,
    };

    entity ProdutoPragas as projection on agroproductdemo.ProdutoPragas {
        *,
        produto: redirected to Produtos,
        cultura: redirected to Culturas,
        praga:   redirected to Pragas
    };

    @odata.draft.enabled
    entity PrincipiosAtivos as projection on agroproductdemo.PrincipiosAtivos;

    @odata.draft.enabled
    entity Pragas as projection on agroproductdemo.Pragas;

    @odata.draft.enabled
    entity Culturas as projection on agroproductdemo.Culturas;


    //For SAPUI5 Freestyle
     
    entity ProdutosCrud as projection on agroproductdemo.Produtos {
        *,
        composicao: redirected to ComposicaoCrud,
        pragas: redirected to ProdutoPragasCrud,
    };

    entity ComposicaoCrud as projection on agroproductdemo.Composicao {
        *,
        produto: redirected to ProdutosCrud,
        principioAtivo: redirected to PrincipiosAtivosCrud,
    };

    entity ProdutoPragasCrud as projection on agroproductdemo.ProdutoPragas {
        *,
        produto: redirected to ProdutosCrud,
        cultura: redirected to CulturasCrud,
        praga:   redirected to PragasCrud
    };

    entity PrincipiosAtivosCrud as projection on agroproductdemo.PrincipiosAtivos;

    entity PragasCrud as projection on agroproductdemo.Pragas;

    entity CulturasCrud as projection on agroproductdemo.Culturas;  


    function getMatrix(ID: String) returns {};

}