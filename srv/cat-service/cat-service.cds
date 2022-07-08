using agroproductdemo as agroproductdemo from '../../db/data-model';

service CatalogService {
    @odata.draft.enabled
    entity Produtos as projection on agroproductdemo.Produtos;

    entity Composicao as projection on agroproductdemo.Composicao;

    entity ProdutoPragas as projection on agroproductdemo.ProdutoPragas;

    @odata.draft.enabled
    entity PrincipiosAtivos as projection on agroproductdemo.PrincipiosAtivos;

    @odata.draft.enabled
    entity Pragas as projection on agroproductdemo.Pragas;

    @odata.draft.enabled
    entity Culturas as projection on agroproductdemo.Culturas;
}