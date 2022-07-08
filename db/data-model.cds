using {
  cuid,
  managed,
  sap,
  temporal,
  Currency,
  User
} from '@sap/cds/common';


namespace agroproductdemo;


//----------------------- Produto  ---------------------//
//------------------------------------------------------//
//------------------------------------------------------//
//Entity
entity Produtos: cuid, managed {
    cdProduto: String;
    nomeProduto: String;
    composicao: Composition of many Composicao on composicao.produto = $self;
    pragas: Composition of many ProdutoPragas on pragas.produto = $self;
    obsProduto: LargeString @Core.LongDescription;
}

//Annotation
annotate Produtos  @(
    title              : '{i18n>Produtos}',
    description        : nomeProduto,
    UI.TextArrangement : #TextOnly,
    cds.odata.valuelist,
    Common.SemanticKey : [cdProduto],
    UI.Identification  : [{
        $Type : 'UI.DataField',
        Value : cdProduto
    }]
) {
    ID                @(
        Core.Computed,
        Common.Text : {
            $value                 : cdProduto,
            ![@UI.TextArrangement] : #TextOnly
        }
    );

    cdProduto @(
        title       : '{i18n>cdProduto}',
        description : '{i18n>cdProduto}',
        Common      : {
            FieldControl             : #Mandatory,
            TextFor                  : ID
        }
    );
    nomeProduto       @(
        title            : '{i18n>nomeProduto}',
        description      : '{i18n>nomeProduto}',
        UI.MultiLineText : true,
        Common           : {FieldControl : #Mandatory}
    );
    composicao  @(
      title       : '{i18n>composicao}',
      description : '{i18n>composicao}'
    );
    pragas    @(
      title       : '{i18n>pragas}',
      description : '{i18n>pragas}'
    );
    obsProduto @(
      title       : '{i18n>obsProduto}',
      description : '{i18n>obsProduto}',
      UI.MultiLineText : true,
  );

}
//--------------------- Composição  ---------------------//
//------------------------------------------------------//
//------------------------------------------------------//
//Entity
entity Composicao: cuid {
    produto: Association to Produtos;
    principioAtivo: Association to PrincipiosAtivos;
    qtdGL: Decimal(15,2) ;
    perMassa: Decimal(15,2);
}

//Annotation
annotate Composicao with {
    ID          @Core.Computed;
   
    produto @(
        Common.Text                     : {
            $value                 : produto.nomeProduto,
            ![@UI.TextArrangement] : #TextOnly
        },
        title                           : '{i18n>produto}',
        Common.ValueListWithFixedValues : false,
        Common.ValueList                : {
            CollectionPath : 'Produto',
            Parameters     : [
                {
                    $Type             : 'Common.ValueListParameterInOut',
                    LocalDataProperty : 'produto_ID',
                    ValueListProperty : 'ID'
                },
                {
                    $Type             : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'nomeProduto'
                }      
            ]
        }
    );
    principioAtivo   @(
        Common.Text                     : {
            $value                 : principioAtivo.nomePrincipioAtivo,
            ![@UI.TextArrangement] : #TextOnly
        },
        Common.ValueListWithFixedValues : false,
        title                           : '{i18n>principioAtivo}',
        Common.ValueList                : {
            CollectionPath : 'PrincipiosAtivos',
            Parameters     : [
                {
                    $Type             : 'Common.ValueListParameterInOut',
                    LocalDataProperty : 'principioAtivo_ID',
                    ValueListProperty : 'ID'
                },  
                {
                    $Type             : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'nomePrincipiosAtivosComum'
                }           
            ]
        }
    );
    qtdGL @(
      title       : '{i18n>qtdGL}',
      description : '{i18n>qtdGL}'
    );
    perMassa @(
      title       : '{i18n>perMassa}',
      description : '{i18n>perMassa}'
    );
};


//------------------- PrincipiosAtivos  -------------------//
//------------------------------------------------------//
//------------------------------------------------------//
//Entity
entity PrincipiosAtivos: cuid, managed {
    nomePrincipioAtivo: String;
    nomePrincipioAtivoComum: String
}

//Annotation
annotate PrincipiosAtivos with @(
    title              : '{i18n>PrincipiosAtivos}',
    description        : nomePrincipioAtivo,
    UI.TextArrangement : #TextOnly,
    cds.odata.valuelist,
    Common.SemanticKey : [nomePrincipioAtivo],
    UI.Identification  : [{
        $Type : 'UI.DataField',
        Value : nomePrincipioAtivo
    }]
) {
    ID                @(
        Core.Computed,
        Common.Text : {
            $value                 : nomePrincipioAtivo,
            ![@UI.TextArrangement] : #TextOnly
        }
    );

    nomePrincipioAtivo @(
        title       : '{i18n>nomePrincipioAtivo}',
        description : '{i18n>nomePrincipioAtivo}',
        Common      : {
            FieldControl             : #Mandatory,
            TextFor                  : ID
        }
    );
    nomePrincipioAtivoComum       @(
        title            : '{i18n>nomePrincipioAtivoComum}',
        description      : '{i18n>nomePrincipioAtivoComum}',
        UI.MultiLineText : true,
        Common           : {FieldControl : #Mandatory}
    );
}



//------------------------ Pragas  ---------------------//
//------------------------------------------------------//
//------------------------------------------------------//
//Entity
entity ProdutoPragas: cuid, managed {
    produto: Association to Produtos;
    cultura: Association to Culturas;
    praga: Association to Pragas;
    doseMin: Decimal(13,2);
    doseMax: Decimal(13,2);
    volApliTerrestreMin: Decimal(13,2);
    volApliTerrestreMax: Decimal(13,2);
}

//Annotation
annotate ProdutoPragas with {
    ID          @Core.Computed;
   
    produto @(
        Common.Text                     : {
            $value                 : produto.nomeProduto,
            ![@UI.TextArrangement] : #TextOnly
        },
        title                           : '{i18n>produto}',
        Common.ValueListWithFixedValues : false,
        Common.ValueList                : {
            CollectionPath : 'Produto',
            Parameters     : [
                {
                    $Type             : 'Common.ValueListParameterInOut',
                    LocalDataProperty : 'produto_ID',
                    ValueListProperty : 'ID'
                },
                {
                    $Type             : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'nomeProduto'
                }      
            ]
        }
    );
    cultura   @(
        Common.Text                     : {
            $value                 : cultura.nomeCultura,
            ![@UI.TextArrangement] : #TextOnly
        },
        Common.ValueListWithFixedValues : false,
        title                           : '{i18n>Praga}',
        Common.ValueList                : {
            CollectionPath : 'culturas',
            Parameters     : [
                {
                    $Type             : 'Common.ValueListParameterInOut',
                    LocalDataProperty : 'cultura_ID',
                    ValueListProperty : 'ID'
                }          
            ]
        }
    );
    praga   @(
        Common.Text                     : {
            $value                 : praga.nomePraga,
            ![@UI.TextArrangement] : #TextOnly
        },
        Common.ValueListWithFixedValues : false,
        title                           : '{i18n>Praga}',
        Common.ValueList                : {
            CollectionPath : 'Pragas',
            Parameters     : [
                {
                    $Type             : 'Common.ValueListParameterInOut',
                    LocalDataProperty : 'praga_ID',
                    ValueListProperty : 'ID'
                },  
                {
                    $Type             : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'nomePragaCientifico'
                }           
            ]
        }
    );
    doseMin @(
      title       : '{i18n>doseMin}',
      description : '{i18n>doseMin}',
      Common      : {
          FieldControl             : #Mandatory,
      }
    );
    doseMax @(
      title       : '{i18n>doseMax}',
      description : '{i18n>doseMax}',
      Common      : {
          FieldControl             : #Mandatory,
      }
    );
    volApliTerrestreMin @(
      title       : '{i18n>volApliTerrestreMin}',
      description : '{i18n>volApliTerrestreMin}',
      Common      : {
          FieldControl             : #Mandatory,
      }
    );
    volApliTerrestreMax @(
      title       : '{i18n>volApliTerrestreMax}',
      description : '{i18n>volApliTerrestreMax}',
      Common      : {
          FieldControl             : #Mandatory,
      }
    );
};




//------------------------ Pragas  ---------------------//
//------------------------------------------------------//
//------------------------------------------------------//
//Entity
entity Pragas: cuid, managed {
    nomePraga : String not null;
    nomePragaCientifico: String not null;
}

//Annotation
annotate Pragas with @(
    title              : '{i18n>Pragas}',
    description        : nomePraga,
    UI.TextArrangement : #TextOnly,
    cds.odata.valuelist,
    Common.SemanticKey : [nomePraga],
    UI.Identification  : [{
        $Type : 'UI.DataField',
        Value : nomePraga
    }]
) {
    ID                @(
        Core.Computed,
        Common.Text : {
            $value                 : nomePraga,
            ![@UI.TextArrangement] : #TextOnly
        }
    );

    nomePraga @(
        title       : '{i18n>nomePraga}',
        description : '{i18n>nomePraga}',
        Common      : {
            FieldControl             : #Mandatory,
            TextFor                  : ID
        }
    );
    nomePragaCientifico       @(
        title            : '{i18n>nomePragaCientifico}',
        description      : '{i18n>nomePragaCientifico}',
        UI.MultiLineText : true,
        Common           : {FieldControl : #Mandatory}
    );
}






//----------------------- Culturas  ---------------------//
//------------------------------------------------------//
//------------------------------------------------------//
//Entity
entity Culturas: cuid, managed {
    nomeCultura: String not null;
}

//Annotation
annotate Culturas with @(
    title              : '{i18n>Culturas}',
    description        : nomeCultura,
    UI.TextArrangement : #TextOnly,
    cds.odata.valuelist,
    Common.SemanticKey : [nomeCultura],
    UI.Identification  : [{
        $Type : 'UI.DataField',
        Value : nomeCultura
    }]
) {
    ID                @(
        Core.Computed,
        Common.Text : {
            $value                 : nomeCultura,
            ![@UI.TextArrangement] : #TextOnly
        }
    );

    nomecultura @(
        title       : '{i18n>nomeCultura}',
        description : '{i18n>nomeCultura}',
        Common      : {
            FieldControl             : #Mandatory,
            TextFor                  : ID
        }
    );
};    
