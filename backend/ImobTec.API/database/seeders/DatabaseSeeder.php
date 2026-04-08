<?php

namespace Database\Seeders;

use App\Models\Imobiliaria;
use App\Models\Imovel;
use App\Models\ImovelImagem;
use App\Models\Permissao;
use App\Models\Usuario;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Permissões
        $admin = Permissao::create(['NM_PERMISSAO' => 'ADMIN', 'DS_PERMISSAO' => 'Administrador do sistema']);
        $corretor = Permissao::create(['NM_PERMISSAO' => 'CORRETOR', 'DS_PERMISSAO' => 'Corretor de imóveis']);
        Permissao::create(['NM_PERMISSAO' => 'USUARIO', 'DS_PERMISSAO' => 'Usuário comum']);

        // Usuário admin
        Usuario::create([
            'NM_USUARIO' => 'Admin ImobTec',
            'DS_USUARIO' => 'admin',
            'DS_EMAIL' => 'admin@imobtec.com',
            'DS_SENHA' => Hash::make('123456'),
            'DS_GENERO' => 'Outro',
            'TP_PERMISSAO' => $admin->ID_PERMISSAO,
        ]);

        // Imobiliárias
        $imob1 = Imobiliaria::create([
            'NM_IMOBILIARIA' => 'ImobTec Prime',
            'RZ_SOCIAL' => 'ImobTec Prime Ltda',
            'DS_CNPJ' => '12.345.678/0001-90',
            'NM_TELEFONE' => '(11) 99999-0001',
            'DS_EMAIL' => 'contato@imobtecprime.com',
            'DS_CEP' => '01310-100',
            'DS_RUA' => 'Av. Paulista',
            'NR_CASA' => '1000',
            'NM_BAIRRO' => 'Bela Vista',
            'NM_CIDADE' => 'São Paulo',
            'NM_ESTADO' => 'SP',
        ]);

        $imob2 = Imobiliaria::create([
            'NM_IMOBILIARIA' => 'Casa & Lar Imóveis',
            'RZ_SOCIAL' => 'Casa e Lar Imóveis ME',
            'DS_CNPJ' => '98.765.432/0001-10',
            'NM_TELEFONE' => '(21) 99888-0002',
            'DS_EMAIL' => 'contato@casaelar.com',
            'DS_CEP' => '22041-080',
            'DS_RUA' => 'Rua Barata Ribeiro',
            'NR_CASA' => '500',
            'NM_BAIRRO' => 'Copacabana',
            'NM_CIDADE' => 'Rio de Janeiro',
            'NM_ESTADO' => 'RJ',
        ]);

        // Imóveis
        $imoveis = [
            [
                'ID_IMOBILIARIA' => $imob1->ID_IMOBILIARIA,
                'NM_IMOVEL' => 'Cobertura Duplex Paulista',
                'TP_IMOVEL' => 'APARTAMENTO',
                'VR_IMOVEL' => 1850000.00,
                'DS_TEXTO' => 'Cobertura duplex com vista panorâmica da Av. Paulista. Acabamento premium, piscina privativa e 3 vagas.',
                'DS_CEP_IMOVEL' => '01310-100',
                'DS_BAIRRO_IMOVEL' => 'Bela Vista',
                'DS_CIDADE_IMOVEL' => 'São Paulo',
                'DS_ESTADO_IMOVEL' => 'SP',
                'QT_QUARTOS' => 4,
                'QT_BANHEIROS' => 3,
                'QT_VAGAS' => 3,
                'VR_AREA_TOTAL' => 280.00,
                'FL_DESTAQUE' => true,
            ],
            [
                'ID_IMOBILIARIA' => $imob1->ID_IMOBILIARIA,
                'NM_IMOVEL' => 'Studio Moderno Pinheiros',
                'TP_IMOVEL' => 'APARTAMENTO',
                'VR_IMOVEL' => 420000.00,
                'DS_TEXTO' => 'Studio moderno e compacto, ideal para jovens profissionais. Próximo ao metrô Faria Lima.',
                'DS_CEP_IMOVEL' => '05422-010',
                'DS_BAIRRO_IMOVEL' => 'Pinheiros',
                'DS_CIDADE_IMOVEL' => 'São Paulo',
                'DS_ESTADO_IMOVEL' => 'SP',
                'QT_QUARTOS' => 1,
                'QT_BANHEIROS' => 1,
                'QT_VAGAS' => 1,
                'VR_AREA_TOTAL' => 38.00,
                'FL_DESTAQUE' => true,
            ],
            [
                'ID_IMOBILIARIA' => $imob2->ID_IMOBILIARIA,
                'NM_IMOVEL' => 'Casa Jardim Oceânico',
                'TP_IMOVEL' => 'CASA',
                'VR_IMOVEL' => 3200000.00,
                'DS_TEXTO' => 'Casa ampla com jardim, piscina e churrasqueira. Região nobre da Barra da Tijuca.',
                'DS_CEP_IMOVEL' => '22621-040',
                'DS_BAIRRO_IMOVEL' => 'Barra da Tijuca',
                'DS_CIDADE_IMOVEL' => 'Rio de Janeiro',
                'DS_ESTADO_IMOVEL' => 'RJ',
                'QT_QUARTOS' => 5,
                'QT_BANHEIROS' => 4,
                'QT_VAGAS' => 4,
                'VR_AREA_TOTAL' => 450.00,
                'FL_DESTAQUE' => true,
            ],
            [
                'ID_IMOBILIARIA' => $imob2->ID_IMOBILIARIA,
                'NM_IMOVEL' => 'Sala Comercial Centro',
                'TP_IMOVEL' => 'COMERCIAL',
                'VR_IMOVEL' => 650000.00,
                'DS_TEXTO' => 'Sala comercial no coração do centro do Rio. Prédio moderno com infraestrutura completa.',
                'DS_CEP_IMOVEL' => '20031-170',
                'DS_BAIRRO_IMOVEL' => 'Centro',
                'DS_CIDADE_IMOVEL' => 'Rio de Janeiro',
                'DS_ESTADO_IMOVEL' => 'RJ',
                'QT_QUARTOS' => 0,
                'QT_BANHEIROS' => 2,
                'QT_VAGAS' => 1,
                'VR_AREA_TOTAL' => 120.00,
                'FL_DESTAQUE' => false,
            ],
            [
                'ID_IMOBILIARIA' => $imob1->ID_IMOBILIARIA,
                'NM_IMOVEL' => 'Terreno Alphaville',
                'TP_IMOVEL' => 'TERRENO',
                'VR_IMOVEL' => 980000.00,
                'DS_TEXTO' => 'Terreno de esquina em condomínio fechado. Pronto para construir, documentação em dia.',
                'DS_CEP_IMOVEL' => '06454-000',
                'DS_BAIRRO_IMOVEL' => 'Alphaville',
                'DS_CIDADE_IMOVEL' => 'Barueri',
                'DS_ESTADO_IMOVEL' => 'SP',
                'QT_QUARTOS' => 0,
                'QT_BANHEIROS' => 0,
                'QT_VAGAS' => 0,
                'VR_AREA_TOTAL' => 600.00,
                'FL_DESTAQUE' => false,
            ],
        ];

        foreach ($imoveis as $dados) {
            $imovel = Imovel::create($dados);

            ImovelImagem::create([
                'ID_IMOVEL' => $imovel->ID_IMOVEL,
                'DS_URL' => 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80',
                'FL_PRINCIPAL' => true,
                'NR_ORDEM' => 0,
            ]);

            ImovelImagem::create([
                'ID_IMOVEL' => $imovel->ID_IMOVEL,
                'DS_URL' => 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1400&q=80',
                'FL_PRINCIPAL' => false,
                'NR_ORDEM' => 1,
            ]);
        }
    }
}
