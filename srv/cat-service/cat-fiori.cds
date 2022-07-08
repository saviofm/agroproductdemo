using CatalogService from './cat-service';




//----------------------- Produto ----------------------//
//------------------------------------------------------//
//------------------------------------------------------//
//List Page
annotate CatalogService.Produtos with @(
	UI: {
        LineItem: [
			{   
                $Type: 'UI.DataField', 
                Value: cdProduto,
                ![@UI.Importance] : #High
            },     
            {   
                $Type : 'UI.DataField', 
                Value : nomeProduto,
                ![@UI.Importance] : #High
            },
            {   
                $Type : 'UI.DataField', 
                Value : obsProduto,
                ![@UI.Importance] : #High
            },            
		],
        PresentationVariant : {
            $Type     : 'UI.PresentationVariantType',
            SortOrder : [{Property : cdProduto}]
        },
        SelectionFields: [ 
            cdProduto,
            nomeProduto
        ],
	},
//Object Page
	UI: {
        HeaderInfo: {          
            Title : { 
                Value: cdProduto
            },
            TypeName: '{i18n>Produto}',
            TypeNamePlural: '{i18n>Produtos}',
            Description: { 
                Value: '{i18n>Produtos}'
            }, 
        },
		HeaderFacets            : [
            {
                $Type             : 'UI.ReferenceFacet',
                Target            : '@UI.FieldGroup#Admin',
                ![@UI.Importance] : #Medium
            }
        ],
        FieldGroup #GeneralData: {
            $Type : 'UI.FieldGroupType',
			Data: [
                {
                    $Type : 'UI.DataField',
                    Value: cdProduto
                },
            
                {
                    $Type : 'UI.DataField',
                    Value: nomeProduto
                }
			]                        
        },
        FieldGroup #Obs: {
            $Type : 'UI.FieldGroupType',
			Data: [
                {
                    $Type : 'UI.DataField',
                    Value: obsProduto
                }
            ]                        
        },
        FieldGroup #Admin: {
            Data : [
                {
                    $Type : 'UI.DataField',
                    Value : createdBy
                },
                {
                    $Type : 'UI.DataField',
                    Value : modifiedBy
                },
                {
                    $Type : 'UI.DataField',
                    Value : createdAt
                },
                {
                    $Type : 'UI.DataField',
                    Value : modifiedAt
                }
            ]
        },
        // Page Facets
		Facets: [
            {    
                $Type: 'UI.ReferenceFacet', 
                Label: '{i18n>GeneralData}', 
                Target: '@UI.FieldGroup#GeneralData'
            },
            {    
                $Type: 'UI.ReferenceFacet', 
                Label: '{i18n>composicao}', 
                Target: 'composicao/@UI.LineItem'
            },
            {    
                $Type: 'UI.ReferenceFacet', 
                Label: '{i18n>pragas}', 
                Target: 'pragas/@UI.LineItem'
            },
            {    
                $Type: 'UI.ReferenceFacet', 
                Label: '{i18n>Obs}', 
                Target: '@UI.FieldGroup#Obs'
            },
        ]    
    }
);


//-------------------- Composicao  ---------------------//
//------------------------------------------------------//
//------------------------------------------------------//
annotate CatalogService.Composicao with @( 
   	UI: {
    	TextArrangement     : #TextOnly,
        LineItem: [           
			{
                $Type             : 'UI.DataField',
                Value             : principioAtivo_ID,
                ![@UI.Importance] : #High
            },            
            {   
                $Type             : 'UI.DataField',
                Value             : principioAtivo.nomePrincipioAtivoComum,
                ![@UI.Importance] : #High
            },
            {   
                $Type             : 'UI.DataField',
                Value             : qtdGL,
                ![@UI.Importance] : #High
            },
            {   
                $Type             : 'UI.DataField',
                Value             : perMassa,
                ![@UI.Importance] : #High
            }                       
		],
        PresentationVariant : {
            $Type     : 'UI.PresentationVariantType',
            SortOrder : [{Property : principioAtivo_ID}]
        }
    },
// Object Header
    UI: { 
        HeaderInfo: {         
            Title: {
                $Type : 'UI.DataField',
                Value : '{i18n>Composicao}'
            },    
            TypeName       : '{i18n>Composicao}',
            TypeNamePlural : '{i18n>Composicao}',
            Description    : {
                Value : '{i18n>Composicao}'
            }
        },    
        FieldGroup #Details : {
            Data : [
                {
                    $Type : 'UI.DataField',
                    Value : principioAtivo_ID,
                    ![@UI.Importance] : #High
                },
                {
                    $Type : 'UI.DataField',
                    Value : principioAtivo.nomePrincipioAtivo,
                    ![@UI.Importance] : #High
                },      
                {
                    $Type : 'UI.DataField',
                    Value : principioAtivo.nomePrincipioAtivoComum,
                    ![@UI.Importance] : #High
                },
                {
                    $Type : 'UI.DataField',
                    Value : qtdGL,
                    ![@UI.Importance] : #High
                },
                {
                    $Type : 'UI.DataField',
                    Value : perMassa,
                    ![@UI.Importance] : #High
                }                                        
            ]
        },
    // Page Facets
        Facets : [
            {
                $Type  : 'UI.CollectionFacet',
                ID     : 'ComposicaoDetails',
                Label  : '{i18n>details}',
                Facets : [
                    {
                        $Type  : 'UI.ReferenceFacet',
                        Label  : '{i18n>details}',
                        Target : '@UI.FieldGroup#Details'
                    }
                ]
            }
        ]
    }  
); 

//--------------- Produto Pragas  ----------------------//
//------------------------------------------------------//
//------------------------------------------------------//
annotate CatalogService.ProdutoPragas with @( 
   	UI: {
    	TextArrangement     : #TextOnly,
        LineItem: [   
			{
                $Type             : 'UI.DataField',
                Value             : cultura_ID,
                ![@UI.Importance] : #High
            },                      
			{
                $Type             : 'UI.DataField',
                Value             : praga_ID,
                ![@UI.Importance] : #High
            },            
            {   
                $Type             : 'UI.DataField',
                Value             : praga.nomePragaCientifico,
                ![@UI.Importance] : #High
            },
            {   
                $Type             : 'UI.DataField',
                Value             : doseMin,
                ![@UI.Importance] : #High
            },
            {   
                $Type             : 'UI.DataField',
                Value             : doseMax,
                ![@UI.Importance] : #High
            },
            {   
                $Type             : 'UI.DataField',
                Value             : volApliTerrestreMin,
                ![@UI.Importance] : #High
            },
            {   
                $Type             : 'UI.DataField',
                Value             : volApliTerrestreMax,
                ![@UI.Importance] : #High
            }                                      
		],
        PresentationVariant : {
            $Type     : 'UI.PresentationVariantType',
            SortOrder : [{Property : praga_ID}]
        }
    },
// Object Header
    UI: { 
        HeaderInfo: {         
            Title: {
                $Type : 'UI.DataField',
                Value : '{i18n>Composicao}'
            },    
            TypeName       : '{i18n>Composicao}',
            TypeNamePlural : '{i18n>Composicao}',
            Description    : {
                Value : '{i18n>Composicao}'
            }
        },    
        FieldGroup #Details : {
            Data : [
                {
                    $Type : 'UI.DataField',
                    Value : cultura_ID,
                    ![@UI.Importance] : #High
                },
                {
                    $Type : 'UI.DataField',
                    Value : praga_ID,
                    ![@UI.Importance] : #High
                },      
                {
                    $Type : 'UI.DataField',
                    Value : praga.nomePragaCientifico,
                    ![@UI.Importance] : #High
                },
                {
                    $Type : 'UI.DataField',
                    Value : doseMin,
                    ![@UI.Importance] : #High
                },
                {
                    $Type : 'UI.DataField',
                    Value : doseMax,
                    ![@UI.Importance] : #High
                },
                {
                    $Type : 'UI.DataField',
                    Value : volApliTerrestreMin,
                    ![@UI.Importance] : #High
                },
                {
                    $Type : 'UI.DataField',
                    Value : volApliTerrestreMax,
                    ![@UI.Importance] : #High
                }                                                         
            ]
        },
    // Page Facets
        Facets : [
            {
                $Type  : 'UI.CollectionFacet',
                ID     : 'ProdutoPragasDetails',
                Label  : '{i18n>details}',
                Facets : [
                    {
                        $Type  : 'UI.ReferenceFacet',
                        Label  : '{i18n>details}',
                        Target : '@UI.FieldGroup#Details'
                    }
                ]
            }
        ]
    }  
); 



//----------------- Principio Ativo --------------------//
//------------------------------------------------------//
//------------------------------------------------------//
//List Page
annotate CatalogService.PrincipiosAtivos with @(
	UI: {
        LineItem: [
			{   
                $Type: 'UI.DataField', 
                Value: nomePrincipioAtivo,
                ![@UI.Importance] : #High
            },
       		{   
                $Type: 'UI.DataField', 
                Value: nomePrincipioAtivoComum,
                ![@UI.Importance] : #High
            },    
		],
        PresentationVariant : {
            $Type     : 'UI.PresentationVariantType',
            SortOrder : [{Property : nomePrincipioAtivo}]
        },
        SelectionFields: [ 
            nomePrincipioAtivo,
            nomePrincipioAtivoComum
        ],
	},
//Object Page
	UI: {
        HeaderInfo: {          
            Title : { 
                $Type : 'UI.DataField',
                Value: '{i18n>PrincipiosAtivos}'
            },
            TypeName: '{i18n>PrincipiosAtivos}',
            TypeNamePlural: '{i18n>PrincipiosAtivos}', 
            Description: { 
                $Type: 'UI.DataField', 
                Value: ID 
            }, 
        },
		HeaderFacets            : [
            {
                $Type             : 'UI.ReferenceFacet',
                Target            : '@UI.FieldGroup#Admin',
                ![@UI.Importance] : #Medium
            }
        ],
        FieldGroup #GeneralData: {
			Data: [
                {
                    $Type : 'UI.DataField',
                    Value: nomePrincipioAtivo
                },
                {
                    $Type : 'UI.DataField',
                    Value: nomePrincipioAtivoComum
                },                
			]                        
        },
        FieldGroup #Admin: {
            Data : [
                {
                    $Type : 'UI.DataField',
                    Value : createdBy
                },
                {
                    $Type : 'UI.DataField',
                    Value : modifiedBy
                },
                {
                    $Type : 'UI.DataField',
                    Value : createdAt
                },
                {
                    $Type : 'UI.DataField',
                    Value : modifiedAt
                }
            ]
        },
        // Page Facets
		Facets: [
            {    
                $Type: 'UI.ReferenceFacet', 
                Label: '{i18n>GeneralData}', 
                Target: '@UI.FieldGroup#GeneralData'
            }
        ]    
    }
);


//----------------------- Pragas -----------------------//
//------------------------------------------------------//
//------------------------------------------------------//
//List Page
annotate CatalogService.Pragas with @(
	UI: {
        LineItem: [
			{   
                $Type: 'UI.DataField', 
                Value: nomePraga,
                ![@UI.Importance] : #High
            },
       		{   
                $Type: 'UI.DataField', 
                Value: nomePragaCientifico,
                ![@UI.Importance] : #High
            },    
		],
        PresentationVariant : {
            $Type     : 'UI.PresentationVariantType',
            SortOrder : [{Property : nomePraga}]
        },
        SelectionFields: [ 
            nomePraga,
            nomePragaCientifico
        ],
	},
//Object Page
	UI: {
        HeaderInfo: {          
            Title : { 
                $Type : 'UI.DataField',
                Value: '{i18n>Pragas}'
            },
            TypeName: '{i18n>Pragas}',
            TypeNamePlural: '{i18n>Pragas}', 
            Description: { 
                $Type: 'UI.DataField', 
                Value: ID 
            }, 
        },
		HeaderFacets            : [
            {
                $Type             : 'UI.ReferenceFacet',
                Target            : '@UI.FieldGroup#Admin',
                ![@UI.Importance] : #Medium
            }
        ],
        FieldGroup #GeneralData: {
			Data: [
                {
                    $Type : 'UI.DataField',
                    Value: nomePraga
                },
                {
                    $Type : 'UI.DataField',
                    Value: nomePragaCientifico
                },                
			]                        
        },
        FieldGroup #Admin: {
            Data : [
                {
                    $Type : 'UI.DataField',
                    Value : createdBy
                },
                {
                    $Type : 'UI.DataField',
                    Value : modifiedBy
                },
                {
                    $Type : 'UI.DataField',
                    Value : createdAt
                },
                {
                    $Type : 'UI.DataField',
                    Value : modifiedAt
                }
            ]
        },
        // Page Facets
		Facets: [
            {    
                $Type: 'UI.ReferenceFacet', 
                Label: '{i18n>GeneralData}', 
                Target: '@UI.FieldGroup#GeneralData'
            }
        ]    
    }
);




//----------------------- Culturas  ---------------------//
//------------------------------------------------------//
//------------------------------------------------------//
//List Page
annotate CatalogService.Culturas with @(
	UI: {
        LineItem: [
			{   
                $Type: 'UI.DataField', 
                Value: nomeCultura,
                ![@UI.Importance] : #High
            }
		],
        PresentationVariant : {
            $Type     : 'UI.PresentationVariantType',
            SortOrder : [{Property : nomeCultura}]
        },
        SelectionFields: [ 
            nomeCultura
        ],
	},
//Object Page
	UI: {
        HeaderInfo: {          
            Title : { 
                $Type : 'UI.DataField',
                Value: '{i18n>Culturas}'
            },
            TypeName: '{i18n>Culturas}',
            TypeNamePlural: '{i18n>Culturas}', 
            Description: { 
                $Type: 'UI.DataField', 
                Value: ID 
            }, 
        },
		HeaderFacets            : [
            {
                $Type             : 'UI.ReferenceFacet',
                Target            : '@UI.FieldGroup#Admin',
                ![@UI.Importance] : #Medium
            }
        ],
        FieldGroup #GeneralData: {
			Data: [
                {
                    $Type : 'UI.DataField',
                    Value: nomeCultura
                }
			]                        
        },
        FieldGroup #Admin: {
            Data : [
                {
                    $Type : 'UI.DataField',
                    Value : createdBy
                },
                {
                    $Type : 'UI.DataField',
                    Value : modifiedBy
                },
                {
                    $Type : 'UI.DataField',
                    Value : createdAt
                },
                {
                    $Type : 'UI.DataField',
                    Value : modifiedAt
                }
            ]
        },
        // Page Facets
		Facets: [
            {    
                $Type: 'UI.ReferenceFacet', 
                Label: '{i18n>GeneralData}', 
                Target: '@UI.FieldGroup#GeneralData'
            }
        ]    
    }
);