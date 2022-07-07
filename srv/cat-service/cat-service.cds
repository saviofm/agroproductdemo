using agroproductdemo as agroproductdemo from '../../db/data-model';

service CatalogService {
    @odata.draft.enabled
    entity Produto as projection on agroproductdemo.Produto;

    entity Composicao as projection on agroproductdemo.Composicao;

    entity ProdutoPragas as projection on agroproductdemo.ProdutoPragas;

    @odata.draft.enabled
    entity PrincipioAtivo as projection on agroproductdemo.PrincipioAtivo;

    @odata.draft.enabled
    entity Pragas as projection on agroproductdemo.Pragas;

    @odata.draft.enabled
    entity Cultura as projection on agroproductdemo.Cultura;
}