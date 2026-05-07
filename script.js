/*

Foi realizado uma transcrisão por IA do código C++ da aula de Algoritmos e Programação para JavaScript, 
com o intuito de criar um jogo de aventura textual em HTML, CSS e JavaScript. 
O código C++ original foi adaptado para a estrutura de um jogo web, 
utilizando elementos como objetos para representar o personagem, 
funções para controlar a lógica do jogo e manipulação do DOM para exibir as cenas e escolhas ao usuário.


// ............................................................................................................................................................ //

                                    // Biblioteca de dados //
#include <iostream>
#include <string>
#include <clocale>
#include <ctime>
using namespace std;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                                    // INICIO PROGRAMAÇÃO //

int main() {

setlocale(LC_ALL, "portuguese"); // Configuração do locale para português no Windows // - não parece que funcionou //
srand(time(NULL));

// ............................................................................................................................................................ //

                                    // Tipos e Variaveis para calcular e alterar o padrão do jogo //

int opcao; // uso do menu principal//
bool menuContinuar = true; // uso do menu principal //

string nome, mago; // nome e tipo mago // 
int escolha, escolha20; // molde para calcular as escolhas no if/else if em cada cena//

float vital, mag, forca, def, ouro; // atributos do personagem //
float bvital, bmag, bforca, bdef, bvida, bdef_pro; // para bonus //
float pot; // itens //

float vitalInicial, magInicial, forcaInicial, defInicial; // feito para guardar a escolha de mago e calcular na mecânica de repouso e level up //

float vitalCheckpoint, magCheckpoint, forcaCheckpoint, defCheckpoint, ouroCheckpoint, potCheckpoint; // checkpoint atributos antes de um batalha de chefe //
float bvitalCheckpoint, bmagCheckpoint, bforcaCheckpoint, bdefCheckpoint; // checkpoint bonus atributos antes de um batalha de chefe //

int dado, i; // para usar a mecâcnica de rand() //

string opcao1, opcao2, opcao3; // teste opcoes //

int cenaAtual = 1; // desafio do chefe //
bool jogoAtivo = true, desafio = true; // desafio do chefe //
int vidasRestantes; // desafio do chefe 3 tentativas //
int mortes = 0; // contador de mortes - desafio dos chefes //

bool jogoFeito = false; // controla se já jogou ao menos uma vez //
string historico = "";  // armazena todas as jogadas em texto //
int contadorJornada = 0;
bool fimDeJogo;

// ............................................................................................................................................................ //

                                    //                //
                                    // TÍTULO DO JOGO //
                                    // MENU PRINCIPAL //
                                    //                //
                                    
                                    
    do {
	    opcao = 0;
		// solicita ao usuario a variavel option que definira em qual case do switch //
		// entraremos //
		cout << "\n    ======================================= " << endl;
		cout << "   |             MENU PRINCIPAL            |" << endl;
		cout << "   | \033[34m Aventura do Mago Coletor de Cristais\033[0m |" << endl;
		cout << "    ======================================= " << endl;
		cout << "   |                                       |" << endl;
		cout << "   |              (1) Jogar                |" << endl;
		if (jogoFeito)
        cout << "   |        \033[33m(4). Histórico de Jogo\033[0m         |" << endl;
		cout << "   |              (2) Sobre                |" << endl;
		cout << "   |              (3) Sair                 |" << endl;
		cout << "   |                                       |" << endl;
		cout << "    ======================================= " << endl;
		cout << "               Escolha uma opção: ";
		cin >> opcao;
		
		cout << "\033c";
		
		switch (opcao) {  // Menu do jogo //
		
		case 1:
            
            cout<<"\033[34m Bem Vindo a Aventura do Mago Coletor de Cristais:\033[0m\n\n";
            contadorJornada++;
            
            // Escolha de nome do personagem //
            cout<<"\033[33m Digite o nome do seu personagem : \033[0m";
            cin.ignore();
            getline(cin, nome);
            
                                        //1ª Escolha do jogo//
                    /////////////////////////////////////////////////////////////////
               
            cout<<"\n Escolha sua classe de mago : "<<endl; // Escolha do tipo do mago no jogo // 
            cout<<"   1.\033[31m Mago de Fogo\033[0m \n"
                <<"   2.\033[34m Mago de Gelo \033[0m \n"
                <<"   3.\033[32m Mago da Terra \033[0m "<<endl;
                
            // Aqui fica toda a opção de escolha e forçando a informação correta para continuar //
            do {
                cout<<"\033[33m   Sua escolha será : \033[0m";
                cin>>escolha;
                if (escolha == 1) {
                    vital=70, mag=60, forca=50, def=50, ouro=50; // atributos inicias do personagem //
                    mago = "\033[31mMago de Fogo\033[0m";
                    historico += "\n   Sua escolha inicial foi ser uma Mago de Fogo";
                } 
                else if (escolha == 2) {
                    vital=80, mag=70, forca=40, def=40, ouro=50; // atributos inicias do personagem //
                    mago = "\033[34mMago de Gelo\033[0m";
                    historico += "\n   Sua escolha inicial foi ser uma Mago de Gelo";
                }
                else if (escolha == 3) {  
                    vital=90, mag=50, forca=50, def=40, ouro=50; // atributos inicias do personagem //
                    mago = "\033[32mMago da Terra\033[0m";
                    historico += "\n   Sua escolha inicial foi ser uma Mago da Terra";
                } 
                else {
                    cout<<"\033[31m   Esse Mago não existe! Digite de 1 a 3.\n\n\033[0m";
                }
            } while (escolha < 1 || escolha > 3);
                    /////////////////////////////////////////////////////////////////
                   
           // ............................................................................................................................................................ //
           
                    // feito para guardar os atributos da escolha de mago e calcular quando curar atributos por meio da mecânica de repousar //
            vitalInicial=vital, magInicial=mag, forcaInicial=forca, defInicial=def;
                
            // ............................................................................................................................................................ //
            
                                    //Atualização de atributos//
            cout<<"\n   E aqui está sua ficha de atributos iniciais\n\n";
            cout<<"\033[32m   Nome do Mago : \033[0m"<<nome<<", o "<<mago<<endl;
            cout<<"\033[32m   Vitalidade : \033[0m"<<vital<<"\t"<<"\033[32m Magia : \033[0m"<<mag<<"\t"
                <<"\033[32m Força : \033[0m"<<forca<<"\t"<<"\033[32m Defesa : \033[0m"<<def<<"\t"
                <<"\033[32m Ouro : \033[0m"<<ouro<<endl;
                
                                        //2ª Escolha do jogo//
                    /////////////////////////////////////////////////////////////////
                    
            cout<<"\n Escolha a vestimenta que deseja se equipar antes de começar a aventura?"<<endl;
            cout<<"   1. Vestimenta Elemental \n"
                <<"   2. Vestimenta Espectral \n" 
                <<"   3. Vestimenta Bruta "<<endl;
                
            // Aqui fica toda a opção de escolha e forçando a informação correta para continuar //
            do {
                cout<<"\033[33m   Sua escolha será : \033[0m";
                cin>>escolha;
                if (escolha == 1) {
                    bvital=10, bmag=5, bforca=0, bdef=5, pot=2; // atributos complementares da vestimenta //
                    cout<<"\n   Vestimenta Elemental: \n"
                        <<"   Cajado Hibrido (Magia +5), Túnica Estrelar (Vitalidade +10, Defesa +5), Poções (+2 - Cura +10) : "<<endl;
                    historico += " com uma Vestimenta Elemental.";
                    cin.ignore(), cin.ignore();
                } 
                else if (escolha == 2) {
                    bvital=5, bmag=10, bforca=0, bdef=5, pot=2;// atributos complementares da vestimenta //
                    cout<<"\n   Vestimenta Espectral: \n"
                        <<"   Cajado Espectral (Magia +10), Túnica Obscura (Vitalidade +5, Defesa +5), Poções (+2 - Cura +10) : "<<endl;
                    historico += " com uma Vestimenta Espectral.";
                    cin.ignore(), cin.ignore();
                } 
                else if (escolha == 3) {
                    bvital=10, bmag=8, bforca=5, bdef=1, pot=2;// atributos complementares da vestimenta //
                    cout<<"\n   Vestimenta Bruta: \n"
                        <<"   Cajado de Ferro (Magia +8, Força +5), Túnica Esfarrada (Vitalidade +10, Defesa +1), Poções (+2 - Cura +10) : "<<endl;
                    historico += " com uma Vestimenta Bruta.";
                    cin.ignore(), cin.ignore();
                }
                else {
                    cout<< "\033[31m    Essa Vestimenta não existe! Digite de 1 a 3.\n\n\033[0m";
                }
            } while (escolha < 1 || escolha > 3);
                    /////////////////////////////////////////////////////////////////
                    
            cout << "\033c";
                                    //Atualização de atributos// 
            cout<<"\n   Você está pronto para a sua aventura"<<endl;
            cout<<"\033[32m   Nome do Mago : \033[0m"<<nome<<", o "<<mago<<endl;
            cout<<"\033[32m   Vitalidade : \033[0m"<<vital<<"\033[33m"<<"+"<<bvital<<"\033[0m"<<"\t"<<"\033[32m Magia : \033[0m"<<mag<<"\033[33m"<<"+"<<bmag<<"\033[0"<<"\t"
                <<"\033[32m Força : \033[0m"<<forca<<"\033[33m"<<"+"<<bforca<<"\t"<<"\033[32m Defesa : \033[0m"<<def<<"\033[33m"<<"+"<<bdef<<"\033[0m"<<"\t"
                <<"\033[32m Ouro : \033[0m"<<ouro<<"\t"<<"\033[32m Poções : \033[33m"<<pot<<"\033[0m\n"<<endl;
                
                
            cout<<"\033[32m  ============================================================================================================  \033[0m\n";
            
                                        //3ª Escolha do jogo//
                    /////////////////////////////////////////////////////////////////
                    
            cout<<"\n   Seguindo em frente na sua jornada após sair da escola de magos você busca se aventurar na floresta proibida. Após uma breve caminhada uma bifurcação inusitada surge na sua visão."<<endl;
            cout<<"      1. Passar pelo local com árvores levando as sombras da floresta em lodo   : "<<endl;
            cout<<"      2. Passar por uma pequena ponte, porém com o caminho cheio de vinhas  : "<<endl;
            cout<<"      3. Entrar na clareira cercado por tocos de árvores : "<<endl;
            
            // Aqui fica toda a opção de escolha e forçando a informação correta para continuar //
            do {
                cout<<"\033[33m      Sua escolha será : \033[0m";
                cin>>escolha;
                if (escolha == 1) {
                    vital -= 10;
                    cout<< "\n   Resultado 1: \n"
                        <<"   Dificuldade em sair do lodo até uma área segura (Vitalidade -10)" << endl;
                    historico += "\n   Na bifurcação teve dificuldade no lodo da floresta proibida.";
                    cin.ignore(), cin.ignore();
                } 
                else if (escolha == 2) {
                    vital -= 5, ouro -= 20;
                    cout<< "\n   Resultado 2: \n"
                        <<"   Se prendeu nas vinhas da ponte e perdeu parte do ouro no riacho (Vitalidade -5, Ouro -20)" << endl;
                    historico += "\n   Na bifurcação se prendeu nas vinhas e perdeu ouro na floresta proibida.";
                    cin.ignore(), cin.ignore();
                } 
                else if (escolha == 3) {
                    vital -= 5, def -= 5;
                    cout<<"\n   Resultado 3: \n"
                        <<"   Algumas abelhas gigantes surgem e começam a te perseguir até o fim da trilha  (Vitalidade -5, Defesa -5)" << endl;
                    historico += "\n   Na bifurcação abelhas o cercaram, mas logo conseguiu fugir delas na floresta proibida.";
                    cin.ignore(), cin.ignore();
                } 
                else {
                    cout<<"\033[31m    Opção inválida! Digite de 1 a 3.\n\n\033[0m";
                }
            } while (escolha < 1 || escolha > 3);
                    /////////////////////////////////////////////////////////////////
            
            cout << "\033c";
                                    //Atualização de atributos// 
            cout<<"\n\033[32m   Nome do Mago : \033[0m"<<nome<<", o "<<mago<<endl;
            cout<<"\033[32m   Vitalidade : \033[0m"<<vital<<"\033[33m"<<"+"<<bvital<<"\033[0m"<<"\t"<<"\033[32m Magia : \033[0m"<<mag<<"\033[33m"<<"+"<<bmag<<"\033[0"<<"\t"
                <<"\033[32m Força : \033[0m"<<forca<<"\033[33m"<<"+"<<bforca<<"\t"<<"\033[32m Defesa : \033[0m"<<def<<"\033[33m"<<"+"<<bdef<<"\033[0m"<<"\t"
                <<"\033[32m Ouro : \033[0m"<<ouro<<"\t"<<"\033[32m Poções : \033[33m"<<pot<<"\033[0m\n"<<endl;
                
            cout<<"\033[32m  ============================================================================================================  \033[0m\n";
            
                                        //4ª Escolha do jogo//
                    /////////////////////////////////////////////////////////////////
                    
            cout<<"\n   Goblins o cercam vendo sua fragilidade...\n"
                <<"   Se prepare para batalhar. Faça sua escolha."<<endl;
            cout<<"      1. Usar uma magia  : \n"
                <<"      2. Utilizar seu cajado em força bruta  : \n"
                <<"      3. Apenas se defender e contra-atacar com rajadas de vento : "<<endl;
                
            // Aqui fica toda a opção de escolha e forçando a informação correta para continuar //
            do {
                cout<<"\033[33m      Sua escolha será : \033[0m";
                cin>>escolha;
                if (escolha == 1) {
                    vital-=10, mag-=10, def-=10;
                    cout<<"\n   Resultado 1: Ataque mal sucedido. Pouco espaço entre as árvores. Perigoso o uso. Você providencia uma magia simples para derrotar os frageis goblins.\n"
                        <<"   (Vitalidade -10, Magia -10, Defesa -10 ) : "<<endl;
                    historico += "\n   Antes de continuar a jornada na floresta, Goblins o emboscaram. Você rapidamente tentou uma magia elemental sem sucesso e fez uma simples para derrotar os frageis goblins.";
                    cin.ignore(), cin.ignore();
                } 
                else if (escolha == 2) {
                    vital-=5, forca-=10, def-=5;
                    cout<<"\n   Resultado 2: Goblins frageis \n"
                        <<"   (Vitalidade -5, Força -10, Defesa -5 ) : "<<endl;
                    historico += "\n   Antes de continuar a jornada na floresta, Goblins o embuscaram. Você rapidamente golpeou os goblins com o cajado para derrota-los.";
                    cin.ignore(), cin.ignore();
                } 
                else if (escolha == 3) {
                    vital-=10, mag-=5, forca-=5;
                    cout<<"\n   Resultado 3: Pouco eficiente a magia de vento o obrigando a usar força bruta \n"
                        <<"   (Vitalidade -10, Magia -5, Força -5 ) : "<<endl;
                    historico += "\n   Antes de continuar a jornada na floresta, Goblins o embuscaram. Você tentou magia de vento sem sucesso e precisou golpear eles com o cajado para derrota-los.";
                    cin.ignore(), cin.ignore();
                }
                else {
                    cout<<"\033[31m    Opção inválida! Digite de 1 a 3.\n\n\033[0m";
                }
            } while (escolha < 1 || escolha > 3);
                    /////////////////////////////////////////////////////////////////
            
            cout << "\033c";
                                    //Atualização de atributos// 
            cout<<"\n\033[32m   Nome do Mago : \033[0m"<<nome<<", o "<<mago<<endl;
            cout<<"\033[32m   Vitalidade : \033[0m"<<vital<<"\033[33m"<<"+"<<bvital<<"\033[0m"<<"\t"<<"\033[32m Magia : \033[0m"<<mag<<"\033[33m"<<"+"<<bmag<<"\033[0"<<"\t"
                <<"\033[32m Força : \033[0m"<<forca<<"\033[33m"<<"+"<<bforca<<"\t"<<"\033[32m Defesa : \033[0m"<<def<<"\033[33m"<<"+"<<bdef<<"\033[0m"<<"\t"
                <<"\033[32m Ouro : \033[0m"<<ouro<<"\t"<<"\033[32m Poções : \033[33m"<<pot<<"\033[0m\n"<<endl;
                
            cout<<"\033[32m  ============================================================================================================  \033[0m\n";
            
                                        //5ª Escolha do jogo//
                    /////////////////////////////////////////////////////////////////
                    
            cout<<"\n   Ao fim da floresta uma entrada de caverna entalhada com arquitetura e runas antigas surge na sua frente. Você resolve explorar ela e sente que não era uma simples caverna, mas um vulcão adormecido."<<endl;
            cout<<"      1. Continuar e batalhar com os elementais de fogo a sua frente : \n"
                <<"      2. Continuar mas contornar para batalhar contra os esqueletos : \n"
                <<"      3. Se guiar pelos trilhos antigos e confrontar qualquer inimigo no caminho : "<<endl;
                
            // Aqui fica toda a opção de escolha e forçando a informação correta para continuar //
            do {
                cout<<"\033[33m      Sua escolha será : \033[0m";
                cin>>escolha;
                if (escolha == 1) {
                    vital-=5, mag-=10, forca-=5;
                    cout<<"\n   Resultado 1: Os elementais demandaram uso de suas habilidades mágicas através do cajado \n"
                        <<"   (Vitalidade -5, Magia -10, Força -5)"<<endl;
                    historico += "\n   A frente você se depara e entra em uma caverna entalhada com arquitetura antiga, que se mostrou ser um vulcão. Batalha contra elementais de fogo para seguir a diante.";
                    cin.ignore(), cin.ignore();
                } 
                else if (escolha == 2) {
                    mag-=5, forca-=10, ouro+=10;
                    cout<<"\n   Resultado 2: A resistência do corpo dos esqueletos era fraco. E por sorte alguns tinham moedas nos trapos de roupa.\n"
                        <<"   (Magia -5, Força -10, Ouro +10)"<<endl;
                    historico += "\n   A frente você se depara e entra em uma caverna entalhada com arquitetura antiga, que se mostrou ser um vulcão. Batalha contra esqueletos frágeis para seguir a diante.";
                    cin.ignore(), cin.ignore();
                }
                else if (escolha == 3) {
                    vital-=5, mag-=5, def-=10;
                    cout<<"\n   Resultado 3: Nenhum inimigo cruzou o seu caminho, mas houve um desmoronamente de pedras que precisou de uma proteção rápida para evitar maiores danos.\n"
                        <<"   (Vitalidade -5, Magia -5, Defesa -10)"<<endl;
                    historico += "\n   A frente você se depara e entra em uma caverna entalhada com arquitetura antiga, que se mostrou ser um vulcão. Seguiu os trilhos e precisou se proteger de um desmoronamento de pedras.";
                    cin.ignore(), cin.ignore();
                } 
                else {
                    cout<<"\033[31m    Opção inválida! Digite de 1 a 3.\n\n\033[0m";
                }
            } while (escolha < 1 || escolha > 3);
                    /////////////////////////////////////////////////////////////////
                    
            cout << "\033c";
                                    //Atualização de atributos// 
            cout<<"\n\033[32m   Nome do Mago : \033[0m"<<nome<<", o "<<mago<<endl;
            cout<<"\033[32m   Vitalidade : \033[0m"<<vital<<"\033[33m"<<"+"<<bvital<<"\033[0m"<<"\t"<<"\033[32m Magia : \033[0m"<<mag<<"\033[33m"<<"+"<<bmag<<"\033[0"<<"\t"
                <<"\033[32m Força : \033[0m"<<forca<<"\033[33m"<<"+"<<bforca<<"\t"<<"\033[32m Defesa : \033[0m"<<def<<"\033[33m"<<"+"<<bdef<<"\033[0m"<<"\t"
                <<"\033[32m Ouro : \033[0m"<<ouro<<"\t"<<"\033[32m Poções : \033[33m"<<pot<<"\033[0m\n"<<endl;
                
            cout<<"\033[32m  ============================================================================================================  \033[0m\n";
            
            // __________________________________________________________________________________________________________________________//
            
                                                    // momento para utilizar uma rolagem de dado //
            
            
            cout<< "\n   Um ser miterioso surge na sua presença com um sorriso malicioso. A criatura se vestia como um bufão com uma vestimenta colorida. Um tom irritante nas expressões e fala\n"
                <<"\033[034m    - Antes que avançe para mais dentro da caverna, acho interessante medir sua sorte antes que perca um braço desnecessariamente... ou necessariamente\033[0m\n"
                <<"   O bufão tira do bolso um dado dourado e arremesa ao alto, quase longe de vista. A cada peco milesegundo que o dado buscava o chão ele aumentava até surgir um dado de um metro no chão com um resultado que poderia definir a jornada do mago"<<endl;
            srand(time(NULL)); // semente randômica gerada a partir da hora do sistema
            for(i=0;i<1;i++){
                dado=(rand() % 6) + 1; // o % coloca os números gerados entre 0 e o resto da divisão - 1
                cout<<"\n      E o resultado foi : \033[33m"<<dado<<"       \033[0m\n";
            }
            cout<<"\033[034m    - Temos o resultado. Aperte qualquer coisa e veja o que aconteceu. Vai! Vai! Coragem! \033[0m\n";
            cin.ignore();
                                    
            if (dado == 1) {
                cout<<"\033[034m    - Sortudo. Nada acontece com um resultado mixuruco desse. \033[0m\n";
                cout<<"\n\033[034m    - Aproveite a batalha contra a criatura chefe desse vulcão. \033[0m\n";
                cin.ignore();
            }
            else if (dado == 2) {
                vital -= 10;
                cout<<"   Vitalidade reduzida \n";
                cout<<"\033[32m   Vitalidade : \033[0m"<<vital<<"\033[33m"<<"+"<<bvital<<"\033[0m"<<endl;
                cout<<"\n\033[034m    - Aproveite a batalha contra a criatura chefe desse vulcão. \033[0m\n";
                cin.ignore();
            }
            else if (dado == 3){
                cout<<"\033[034m    - Sortudo. Nada acontece com um resultado mixuruco desse. \033[0m\n";
                cout<<"\n\033[034m    - Aproveite a batalha contra a criatura chefe desse vulcão. \033[0m\n";
                cin.ignore();
            }
            else if (dado == 4){
                pot +=1;
                cout<<"   Você ganhou uma poção \n";
                cout<<"\033[32m   Poções : \033[33m"<<pot<<"\033[0m"<<endl;
                cout<<"\n\033[034m    - Aproveite a batalha contra a criatura chefe desse vulcão. \033[0m\n";
                cin.ignore();
            }
            else if (dado == 5) {
                forca += 10;
                cout<<"   Força aumentada \n";
                cout<<"\033[32m   Força : \033[0m"<<forca<<"\033[33m"<<"+"<<bforca<<"\033[0m"<<endl;
                cout<<"\n\033[034m    - Aproveite a batalha contra a criatura chefe desse vulcão. \033[0m\n";
                cin.ignore();
            }
            else if (dado == 6){
                cout<<"\033[034m    - Você vai realmente perder um braço se continuar. Acabamos o jogo por aqui. Boa sorte (ou não) na próxima. \033[0m\n";
                historico += "\n   Quando finalmente o desafio surgi a sua vista, uma figura estranha vestida de bufão cruza o seu caminho e joga um dado misterioso. \033[31mE o destino foi morte!.\033[0 ";
                historico += "\n\n\033[32m  ============================================================================================================  \033[0m\n";
                jogoFeito = true;
                cin.ignore();
                cout << "\033c";
                break; // retorna menu //
            }
            
            historico += "\n   Quando finalmente o desafio surgi a sua vista, uma figura estranha vestida de bufão cruza o seu caminho e joga um dado misterioso. Ele anuncia o resultado, mas você não entende o que aconteceu e apenas seguiu adiante.";
            
            cout << "\033c";
            
            // __________________________________________________________________________________________________________________________//
            
            
            // ............................................................................................................................................................ //
            
                                                                        // BATALHA CONTRA O IFRIT //
                                                                //6ª, 7ª, 8ª, 9ª e 10ª Escolha do jogo//

Terminamos na escolha 5º sem a escolha de vestimenta para esse primeiro passo.

*/

let personagem = {};

let sexoEscolhido = false;
let classeEscolhida = false;

// ================= MENU =================
function irCriacao() {
    window.location.href = "personagem.html";
}

function irHistorico() {
    window.location.href = "historico.html";
}

// ================= IMAGENS DO SEXO =================
function imagemSexo(tipo) {
    if (tipo === "masculino") {
        return "MagoComum.png";
    }

    if (tipo === "feminino") {
        return "MagaComum.png";
    }

    return "MagoComum.png";
}

// ================= IMAGENS DA CLASSE =================
function imagemClasse(classe) {

    if (personagem.sexo === "feminino") {
        if (classe === "Fogo") return "MagaFogo.png";
        if (classe === "Gelo") return "MagaGelo.png";
        if (classe === "Terra") return "MagaTerra.png";
    }

    if (personagem.sexo === "masculino") {
        if (classe === "Fogo") return "MagoFogo.png";
        if (classe === "Gelo") return "MagoGelo.png";
        if (classe === "Terra") return "MagoTerra.png";
    }

    return "MagoComum.png";
}

// ================= IMAGEM DE PERFIL =================
function imagemPerfil() {
    if (personagem.sexo === "feminino") {
        return "PerfilMaga.png";
    }

    if (personagem.sexo === "masculino") {
        return "PerfilMago.png";
    }

    return "PerfilMago.png";
}

// ================= MOSTRAR ATRIBUTOS =================
function mostrarAtributos() {
    const area = document.getElementById("atributosClasse");

    if (!area) {
        return;
    }

    area.innerHTML = `
        <h3>Atributos</h3>
        <p><strong>Classe:</strong> Mago de ${personagem.mago}</p>
        <p><strong>Vitalidade:</strong> ${personagem.vital}</p>
        <p><strong>Magia:</strong> ${personagem.mag}</p>
        <p><strong>Força:</strong> ${personagem.forca}</p>
        <p><strong>Defesa:</strong> ${personagem.def}</p>
        <p><strong>Ouro:</strong> ${personagem.ouro}</p>
    `;
}

// ================= PREVIEW DO SEXO =================
function previewSexo(tipo) {

    if (sexoEscolhido) {
        return;
    }

    const img = document.getElementById("imagemSexo");

    if (!img) {
        return;
    }

    img.src = imagemSexo(tipo);
}

// ================= PREVIEW DA CLASSE =================
function preview(tipo) {

    if (!sexoEscolhido) {
        return;
    }

    if (classeEscolhida) {
        return;
    }

    const img = document.getElementById("imagemPreview");

    if (!img) {
        return;
    }

    if (tipo === "fogo") {
        img.src = imagemClasse("Fogo");
    }

    if (tipo === "gelo") {
        img.src = imagemClasse("Gelo");
    }

    if (tipo === "terra") {
        img.src = imagemClasse("Terra");
    }
}

// ================= ESCOLHER SEXO =================
function escolherSexo(tipo) {

    personagem.sexo = tipo;
    sexoEscolhido = true;

    document.getElementById("imagemSexo").src = imagemSexo(tipo);

    document.getElementById("btnMasculino").classList.remove("botao-escolhido");
    document.getElementById("btnFeminino").classList.remove("botao-escolhido");

    if (tipo === "masculino") {
        document.getElementById("btnMasculino").classList.add("botao-escolhido");
    }

    if (tipo === "feminino") {
        document.getElementById("btnFeminino").classList.add("botao-escolhido");
    }

    document.getElementById("btnFogo").disabled = false;
    document.getElementById("btnGelo").disabled = false;
    document.getElementById("btnTerra").disabled = false;

    if (classeEscolhida) {
        document.getElementById("imagemPreview").src = imagemClasse(personagem.mago);
    } else {
        document.getElementById("imagemPreview").src = imagemSexo(tipo);
    }

    verificarConfirmar();
}

// ================= ESCOLHER CLASSE =================
function escolherClasse(opcao) {

    if (!sexoEscolhido) {
        alert("Escolha o sexo primeiro!");
        return;
    }

    classeEscolhida = true;

    if (opcao === 1) {
        personagem.mago = "Fogo";
        personagem.vital = 70;
        personagem.mag = 60;
        personagem.forca = 50;
        personagem.def = 50;
        personagem.ouro = 50;
    }

    if (opcao === 2) {
        personagem.mago = "Gelo";
        personagem.vital = 80;
        personagem.mag = 70;
        personagem.forca = 40;
        personagem.def = 40;
        personagem.ouro = 50;
    }

    if (opcao === 3) {
        personagem.mago = "Terra";
        personagem.vital = 90;
        personagem.mag = 50;
        personagem.forca = 50;
        personagem.def = 40;
        personagem.ouro = 50;
    }

    document.getElementById("imagemPreview").src = imagemClasse(personagem.mago);

    document.getElementById("btnFogo").classList.remove("botao-escolhido");
    document.getElementById("btnGelo").classList.remove("botao-escolhido");
    document.getElementById("btnTerra").classList.remove("botao-escolhido");

    if (opcao === 1) {
        document.getElementById("btnFogo").classList.add("botao-escolhido");
    }

    if (opcao === 2) {
        document.getElementById("btnGelo").classList.add("botao-escolhido");
    }

    if (opcao === 3) {
        document.getElementById("btnTerra").classList.add("botao-escolhido");
    }

    mostrarAtributos();
    verificarConfirmar();
}

// ================= VERIFICAR SE PODE CONFIRMAR =================
function verificarConfirmar() {
    const nomeInput = document.getElementById("nome");
    const btnConfirmar = document.getElementById("btnConfirmar");

    if (!nomeInput || !btnConfirmar) {
        return;
    }

    const nomeDigitado = nomeInput.value.trim();

    if (nomeDigitado !== "" && sexoEscolhido && classeEscolhida) {
        btnConfirmar.disabled = false;
    } else {
        btnConfirmar.disabled = true;
    }
}

// ================= CONFIRMAR PERSONAGEM =================
function confirmarPersonagem() {

    let nomeInput = document.getElementById("nome").value.trim();

    if (nomeInput === "") {
        alert("Digite um nome!");
        return;
    }

    if (!sexoEscolhido) {
        alert("Escolha o sexo!");
        return;
    }

    if (!classeEscolhida) {
        alert("Escolha sua classe!");
        return;
    }

    personagem.nome = nomeInput;
    personagem.runId = Date.now();
    personagem.dataRun = new Date().toLocaleString("pt-BR");
    personagem.historico = "";

    personagem.historico += `Run iniciada em ${personagem.dataRun}.\n`;

    if (personagem.sexo === "feminino") {
        personagem.historico += `${personagem.nome} iniciou sua jornada como uma Maga de ${personagem.mago}.\n`;
    } else {
        personagem.historico += `${personagem.nome} iniciou sua jornada como um Mago de ${personagem.mago}.\n`;
    }

    localStorage.setItem("personagem", JSON.stringify(personagem));

    window.location.href = "jogo.html";
}


// =========================================================
// ========================= JOGO ==========================
// =========================================================

let cenaAtual = 3;

const VIDEO_CENA1 = "Cena1.mp4";

// ================= CARREGAR JOGO =================
function carregarJogo() {

    let dados = localStorage.getItem("personagem");

    if (!dados) {
        alert("Nenhum personagem encontrado!");
        window.location.href = "index.html";
        return;
    }

    personagem = JSON.parse(dados);

    if (!personagem.historico) {
        personagem.historico = "";
    }

    if (personagem.pot === undefined) {
        personagem.pot = 0;
    }

    if (!personagem.runId) {
        personagem.runId = Date.now();
    }

    if (!personagem.dataRun) {
        personagem.dataRun = new Date().toLocaleString("pt-BR");
    }

    cenaAtual = 3;

    mostrarCena3();
}

// ================= FICHA DO PERSONAGEM =================
function montarFichaPersonagem() {

    let tituloPersonagem = "";

    if (personagem.sexo === "feminino") {
        tituloPersonagem = `${personagem.nome}, a Maga de ${personagem.mago}`;
    } else {
        tituloPersonagem = `${personagem.nome}, o Mago de ${personagem.mago}`;
    }

    return `
        <div class="ficha-personagem">
            <div class="ficha-topo">

                <div class="perfil-personagem">
                    <img src="${imagemPerfil()}" alt="Perfil do personagem">
                </div>

                <div class="info-personagem">
                    <h3>${tituloPersonagem}</h3>

                    <p>
                        <strong>Vitalidade:</strong> ${personagem.vital}
                        |
                        <strong>Magia:</strong> ${personagem.mag}
                        |
                        <strong>Força:</strong> ${personagem.forca}
                        |
                        <strong>Defesa:</strong> ${personagem.def}
                        |
                        <strong>Ouro:</strong> ${personagem.ouro}
                        |
                        <strong>Poções:</strong> ${personagem.pot}
                    </p>
                </div>

            </div>
        </div>
    `;
}

// ================= VÍDEO DA CENA =================
function montarVideoCena(caminhoVideo) {
    return `
        <div class="area-video">
            <video 
                autoplay 
                loop 
                playsinline
                disablepictureinpicture
                controlslist="nodownload nofullscreen noremoteplayback"
                oncontextmenu="return false"
                tabindex="-1"
            >
                <source src="${caminhoVideo}" type="video/mp4">
                Seu navegador não suporta vídeo.
            </video>
        </div>
    `;
}

// ================= ESCOLHA 3 =================
function mostrarCena3() {

    let game = document.getElementById("game");

    game.innerHTML = `
        ${montarFichaPersonagem()}

        <div class="cena-jogo">
            <h3>Floresta Proibida</h3>

            <p>
                Seguindo em frente na sua jornada após sair da escola de magos,
                você busca se aventurar na floresta proibida.
                Após uma breve caminhada, uma bifurcação inusitada surge na sua visão.
            </p>

            <div class="opcoes-jogo">
                <button onclick="resolverCena3(1)">
                    1. Passar pelo local com árvores levando as sombras da floresta em lodo
                </button>

                <button onclick="resolverCena3(2)">
                    2. Passar por uma pequena ponte, porém com o caminho cheio de vinhas
                </button>

                <button onclick="resolverCena3(3)">
                    3. Entrar na clareira cercada por tocos de árvores
                </button>
            </div>
        </div>

        ${montarVideoCena(VIDEO_CENA1)}
    `;
}

function resolverCena3(escolha) {

    let resultado = "";

    if (escolha === 1) {
        personagem.vital -= 10;

        resultado = `
            Dificuldade em sair do lodo até uma área segura.
            <br><br>
            <strong>Vitalidade -10</strong>
        `;

        personagem.historico += "\nNa bifurcação, teve dificuldade no lodo da floresta proibida.";
    }

    else if (escolha === 2) {
        personagem.vital -= 5;
        personagem.ouro -= 20;

        resultado = `
            Você se prendeu nas vinhas da ponte e perdeu parte do ouro no riacho.
            <br><br>
            <strong>Vitalidade -5</strong><br>
            <strong>Ouro -20</strong>
        `;

        personagem.historico += "\nNa bifurcação, se prendeu nas vinhas e perdeu ouro na floresta proibida.";
    }

    else if (escolha === 3) {
        personagem.vital -= 5;
        personagem.def -= 5;

        resultado = `
            Algumas abelhas gigantes surgem e começam a te perseguir até o fim da trilha.
            <br><br>
            <strong>Vitalidade -5</strong><br>
            <strong>Defesa -5</strong>
        `;

        personagem.historico += "\nNa bifurcação, abelhas gigantes o cercaram, mas logo conseguiu fugir delas.";
    }

    salvarPersonagem();

    mostrarResultado(resultado, "mostrarCena4()", VIDEO_CENA1);
}

// ================= ESCOLHA 4 =================
function mostrarCena4() {

    let game = document.getElementById("game");

    game.innerHTML = `
        ${montarFichaPersonagem()}

        <div class="cena-jogo">
            <h3>Emboscada Goblin</h3>

            <p>
                Goblins o cercam vendo sua fragilidade...
                <br>
                Se prepare para batalhar. Faça sua escolha.
            </p>

            <div class="opcoes-jogo">
                <button onclick="resolverCena4(1)">
                    1. Usar uma magia
                </button>

                <button onclick="resolverCena4(2)">
                    2. Utilizar seu cajado em força bruta
                </button>

                <button onclick="resolverCena4(3)">
                    3. Apenas se defender e contra-atacar com rajadas de vento
                </button>
            </div>
        </div>

        ${montarVideoCena(VIDEO_CENA1)}
    `;
}

function resolverCena4(escolha) {

    let resultado = "";

    if (escolha === 1) {
        personagem.vital -= 10;
        personagem.mag -= 10;
        personagem.def -= 10;

        resultado = `
            Ataque mal sucedido. Havia pouco espaço entre as árvores,
            tornando perigoso o uso de magia forte.
            Você usa uma magia simples para derrotar os frágeis goblins.
            <br><br>
            <strong>Vitalidade -10</strong><br>
            <strong>Magia -10</strong><br>
            <strong>Defesa -10</strong>
        `;

        personagem.historico += "\nGoblins o emboscaram. Você tentou uma magia elemental sem sucesso e usou uma magia simples para derrotá-los.";
    }

    else if (escolha === 2) {
        personagem.vital -= 5;
        personagem.forca -= 10;
        personagem.def -= 5;

        resultado = `
            Os goblins eram frágeis.
            Você golpeia os inimigos com o cajado até derrotá-los.
            <br><br>
            <strong>Vitalidade -5</strong><br>
            <strong>Força -10</strong><br>
            <strong>Defesa -5</strong>
        `;

        personagem.historico += "\nGoblins o emboscaram. Você golpeou os goblins com o cajado para derrotá-los.";
    }

    else if (escolha === 3) {
        personagem.vital -= 10;
        personagem.mag -= 5;
        personagem.forca -= 5;

        resultado = `
            A magia de vento foi pouco eficiente,
            obrigando você a usar força bruta para finalizar o combate.
            <br><br>
            <strong>Vitalidade -10</strong><br>
            <strong>Magia -5</strong><br>
            <strong>Força -5</strong>
        `;

        personagem.historico += "\nGoblins o emboscaram. Você tentou magia de vento sem sucesso e precisou derrotá-los com o cajado.";
    }

    salvarPersonagem();

    mostrarResultado(resultado, "mostrarCena5()", VIDEO_CENA1);
}

// ================= ESCOLHA 5 =================
function mostrarCena5() {

    let game = document.getElementById("game");

    game.innerHTML = `
        ${montarFichaPersonagem()}

        <div class="cena-jogo">
            <h3>Caverna Antiga</h3>

            <p>
                Ao fim da floresta, uma entrada de caverna entalhada com arquitetura
                e runas antigas surge na sua frente.
            </p>

            <p>
                Você resolve explorá-la e sente que não era uma simples caverna,
                mas sim um vulcão adormecido.
            </p>

            <div class="opcoes-jogo">
                <button onclick="resolverCena5(1)">
                    1. Continuar e batalhar com os elementais de fogo à sua frente
                </button>

                <button onclick="resolverCena5(2)">
                    2. Continuar, mas contornar para batalhar contra os esqueletos
                </button>

                <button onclick="resolverCena5(3)">
                    3. Se guiar pelos trilhos antigos e confrontar qualquer inimigo no caminho
                </button>
            </div>
        </div>

        ${montarVideoCena(VIDEO_CENA1)}
    `;
}

function resolverCena5(escolha) {

    let resultado = "";

    if (escolha === 1) {
        personagem.vital -= 5;
        personagem.mag -= 10;
        personagem.forca -= 5;

        resultado = `
            Os elementais demandaram o uso de suas habilidades mágicas através do cajado.
            <br><br>
            <strong>Vitalidade -5</strong><br>
            <strong>Magia -10</strong><br>
            <strong>Força -5</strong>
        `;

        personagem.historico += "\nVocê entrou em uma caverna antiga, que se mostrou ser um vulcão, e batalhou contra elementais de fogo.";
    }

    else if (escolha === 2) {
        personagem.mag -= 5;
        personagem.forca -= 10;
        personagem.ouro += 10;

        resultado = `
            A resistência do corpo dos esqueletos era fraca.
            Por sorte, alguns carregavam moedas nos trapos de roupa.
            <br><br>
            <strong>Magia -5</strong><br>
            <strong>Força -10</strong><br>
            <strong>Ouro +10</strong>
        `;

        personagem.historico += "\nVocê entrou em uma caverna antiga, que se mostrou ser um vulcão, e batalhou contra esqueletos frágeis.";
    }

    else if (escolha === 3) {
        personagem.vital -= 5;
        personagem.mag -= 5;
        personagem.def -= 10;

        resultado = `
            Nenhum inimigo cruzou o seu caminho, mas houve um desmoronamento de pedras.
            Você precisou erguer uma proteção rápida para evitar maiores danos.
            <br><br>
            <strong>Vitalidade -5</strong><br>
            <strong>Magia -5</strong><br>
            <strong>Defesa -10</strong>
        `;

        personagem.historico += "\nVocê entrou em uma caverna antiga, seguiu pelos trilhos e precisou se proteger de um desmoronamento.";
    }

    salvarPersonagem();

    mostrarResultadoFinal(resultado, VIDEO_CENA1);
}

// ================= RESULTADOS =================
function mostrarResultado(textoResultado, proximaFuncao, videoCena) {

    let game = document.getElementById("game");

    game.innerHTML = `
        ${montarFichaPersonagem()}

        <div class="resultado-jogo">
            <h3>Resultado</h3>

            <p>${textoResultado}</p>

            <button onclick="${proximaFuncao}">
                Continuar
            </button>
        </div>

        ${montarVideoCena(videoCena)}
    `;
}

function mostrarResultadoFinal(textoResultado, videoCena) {

    let game = document.getElementById("game");

    game.innerHTML = `
        ${montarFichaPersonagem()}

        <div class="resultado-jogo">
            <h3>Resultado</h3>

            <p>${textoResultado}</p>

            <h3>Fim desta parte da jornada</h3>

            <p>
                As escolhas 3, 4 e 5 já foram concluídas.
                A próxima etapa pode ser a rolagem do dado do bufão ou a batalha contra o chefe.
            </p>
            
            <button onclick="encerrarRun()">
                Voltar ao Menu
            </button>
        </div>

        ${montarVideoCena(videoCena)}
    `;
}

// ================= SALVAR PERSONAGEM ATUAL =================
function salvarPersonagem() {
    localStorage.setItem("personagem", JSON.stringify(personagem));
}


// =========================================================
// ======================= HISTÓRICO =======================
// =========================================================

// Verifica se existe pelo menos uma run salva e libera o botão Histórico no index
document.addEventListener("DOMContentLoaded", function () {

    const btnHistorico = document.getElementById("btnHistorico");

    if (!btnHistorico) {
        return;
    }

    let historicoRuns = JSON.parse(localStorage.getItem("historicoRuns")) || [];

    if (historicoRuns.length > 0) {
        btnHistorico.style.display = "block";
    } else {
        btnHistorico.style.display = "none";
    }
});

// Encerra a run atual, salva na lista de runs e volta para o menu
function encerrarRun() {

    if (!personagem.historico) {
        personagem.historico = "";
    }

    personagem.historico += "\nFim desta parte da jornada.";
    personagem.historico += `\nAtributos finais: Vitalidade ${personagem.vital}, Magia ${personagem.mag}, Força ${personagem.forca}, Defesa ${personagem.def}, Ouro ${personagem.ouro}, Poções ${personagem.pot}.`;

    let historicoRuns = JSON.parse(localStorage.getItem("historicoRuns")) || [];

    let novaRun = {
        id: personagem.runId || Date.now(),
        data: personagem.dataRun || new Date().toLocaleString("pt-BR"),
        nome: personagem.nome,
        sexo: personagem.sexo,
        mago: personagem.mago,
        vital: personagem.vital,
        mag: personagem.mag,
        forca: personagem.forca,
        def: personagem.def,
        ouro: personagem.ouro,
        pot: personagem.pot,
        texto: personagem.historico
    };

    historicoRuns.push(novaRun);

    localStorage.setItem("historicoRuns", JSON.stringify(historicoRuns));

    localStorage.removeItem("personagem");

    window.location.href = "index.html";
}

// Carrega todas as runs salvas na página historico.html
function carregarHistorico() {

    const areaHistorico = document.getElementById("textoHistorico");

    if (!areaHistorico) {
        return;
    }

    let historicoRuns = JSON.parse(localStorage.getItem("historicoRuns")) || [];

    if (historicoRuns.length === 0) {
        areaHistorico.innerHTML = `
            <p>Nenhuma run encontrada.</p>
        `;
        return;
    }

    areaHistorico.innerHTML = "";

    for (let i = 0; i < historicoRuns.length; i++) {

        let run = historicoRuns[i];

        let titulo = "";

        if (run.sexo === "feminino") {
            titulo = `${run.nome}, a Maga de ${run.mago}`;
        } else {
            titulo = `${run.nome}, o Mago de ${run.mago}`;
        }

        areaHistorico.innerHTML += `
            <div class="run-historico">
                <h3>Run ${i + 1} - ${titulo}</h3>

                <p><strong>Data:</strong> ${run.data}</p>

                <p>
                    <strong>Atributos finais:</strong>
                    Vitalidade ${run.vital} |
                    Magia ${run.mag} |
                    Força ${run.forca} |
                    Defesa ${run.def} |
                    Ouro ${run.ouro} |
                    Poções ${run.pot}
                </p>

                <p>${run.texto.replace(/\n/g, "<br>")}</p>
            </div>
        `;
    }
}

// Apaga todas as runs salvas
function limparHistorico() {

    localStorage.removeItem("historicoRuns");

    alert("Histórico apagado!");

    window.location.href = "index.html";
}

// ================= TROCAR FUNDO DO INDEX =================

document.addEventListener("DOMContentLoaded", function () {

    const botaoFundo = document.getElementById("fundo-toggle");

    // Se a página atual não tiver esse botão, não faz nada
    if (!botaoFundo) {
        return;
    }

    const fundoSalvo = localStorage.getItem("fundoIndex");

    // Se o usuário já tinha escolhido escuro antes, mantém escuro
    if (fundoSalvo === "escuro") {
        document.body.classList.add("fundo-escuro");
        botaoFundo.checked = true;
    } else {
        document.body.classList.remove("fundo-escuro");
        botaoFundo.checked = false;
    }

    botaoFundo.addEventListener("change", function () {

        if (botaoFundo.checked) {
            document.body.classList.add("fundo-escuro");
            localStorage.setItem("fundoIndex", "escuro");
        } else {
            document.body.classList.remove("fundo-escuro");
            localStorage.setItem("fundoIndex", "claro");
        }

    });

});
