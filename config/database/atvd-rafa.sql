drop database if exists db_praioou;
create database db_praioou;

use db_praioou;
   
create table if not exists cliente (
	cd_cliente int AUTO_INCREMENT,
    nm_cliente varchar(45),
    nm_sobrenomeC varchar(45),
    ds_emailC varchar(100),
    ds_senhaC varchar(100),
    nmr_telefoneC varchar(15),
    
	constraint pk_cliente
		primary key (cd_cliente)
);

create table if not exists plano(
	cd_plano int auto_increment,
	nm_plano varchar(30),
    dt_plano date,
    vl_plano decimal(3,1),
    
    constraint pk_plano
		primary key(cd_plano)
);

create table if not exists barraqueiro (
	cd_barraqueiro int auto_increment,
    nm_barraqueiro varchar(85),
    nm_sobrenomeB varchar(85),
    ds_emailB varchar(100),
    cd_cpfB char (17),
    ds_senhaB varchar (100),
    nmr_telefoneB char(20),
	cd_plano int,
    cd_token varchar(100),
    
    constraint pk_barraqueiro
		primary key (cd_barraqueiro),
        
	constraint fk_plano_barraqueiro
		foreign key(cd_plano)
			references plano(cd_plano) on delete cascade
);

create table if not exists carrinho (
	cd_carrinho int auto_increment,
    cd_barraqueiro int,
    nm_carrinho varchar(45),
    ds_localizacao text(85),
    ds_status enum('Com Vaga','Sem Vaga'),
    
    constraint pk_carrinho
		primary key (cd_carrinho),
        
	constraint fk_barraqueiro_carrinho
		foreign key(cd_barraqueiro)
			references barraqueiro(cd_barraqueiro) on delete cascade
);



create table if not exists reserva (
	cd_reserva int auto_increment,
    cd_carrinho int,
    cd_cliente int,
    dt_reserva date,
    hr_reserva time,
    vl_reserva float,
    
    constraint pk_reserva
		primary key (cd_reserva),
        
	constraint pk_reserva_carrinho
		foreign key (cd_carrinho)
			references carrinho (cd_carrinho) on delete cascade,
        
	constraint pk_reserva_cliente
		foreign key (cd_cliente)
			references cliente(cd_cliente) on delete cascade
);

create table if not exists cardapio (
	cd_cardapio int auto_increment,
    cd_carrinho int,

    constraint pk_cardapio
		primary key (cd_cardapio),
        
	constraint fk_cardapio_carrinho
		foreign key (cd_carrinho)
			references carrinho(cd_carrinho) on delete cascade
);

create table produto (
	cd_produto int auto_increment,
    cd_cardapio int,
    nm_produto varchar(45),
    ds_produto text(150),
    vl_produto float,
    ds_categoria enum('doce', 'salgado', 'bebida'),
    
    constraint pk_produto
		primary key (cd_produto),
        
	constraint fk_produto_cardapio
		foreign key (cd_cardapio)
			references cardapio(cd_cardapio) on delete cascade
);

create table if not exists pedido (
	cd_pedido int auto_increment,
	cd_carrinho int,
    cd_cliente int,
    vl_total_pedido float,
    ds_guarda_sol char(2),
    
    constraint pk_pedido
		primary key (cd_pedido),
	
    constraint fk_pedido_cliente
		foreign key (cd_cliente)
			references cliente(cd_cliente) on delete cascade,
	
    constraint fk_carrinho
		foreign key (cd_carrinho)
			references carrinho(cd_carrinho) on delete cascade
);

create table if not exists sacola (
	cd_pedido int not null,
    cd_produto int not null,
    quantidade int,
    
    constraint pk_sacola
        primary key (cd_pedido, cd_produto),
    
    constraint fk_sacola_pedido
        foreign key (cd_pedido)
            references pedido(cd_pedido) on delete cascade,
    
    constraint fk_sacola_produto
        foreign key (cd_produto)
            references produto(cd_produto) on delete cascade
);

create table if not exists clube (
	cd_clube int auto_increment,
	cd_carrinho int,
    nm_clube varchar(100),
    
    constraint pk_clube
		primary key (cd_clube),
        
	constraint fk_clube_carrinho
		foreign key (cd_carrinho)
			references carrinho(cd_carrinho) on delete cascade
);

create table if not exists clube_usuario (
	cd_clube int,
    cd_cliente int,
    nm_clube varchar(100),
    qt_pontos decimal(45),
        
	constraint fk_clube_usuario_clube
		foreign key (cd_clube)
			references clube (cd_clube) on delete cascade,
            
	constraint fk_clube_usuario_cliente
		foreign key (cd_cliente)
			references cliente(cd_cliente) on delete cascade
);

create table if not exists avaliacao (
	cd_avali int auto_increment,
    cd_carrinho int,
    cd_cliente int,
    ds_avaliacao text(500),
    qt_estrelas decimal(5,1),
    
    constraint pk_avaliacao
		primary key (cd_avali),
        
	constraint fk_avaliacao_carrinho
		foreign key (cd_carrinho)
			references carrinho(cd_carrinho) on delete cascade, 
            
	constraint fk_avaliacao_cliente
		foreign key (cd_cliente)
			references cliente(cd_cliente) on delete cascade
);

create table if not exists favorito_carrinho(
	cd_carrinho int,
    cd_cliente int,
    
    constraint fk_carrinho_favorito
		foreign key (cd_carrinho)
			references carrinho(cd_carrinho) on delete cascade,
            
	constraint fk_favorito_cliente
		foreign key (cd_cliente)
			references cliente(cd_cliente) on delete cascade
    
);

create table if not exists favorito_produto(
	cd_produto int,
    cd_cardapio int,
    cd_cliente int,

    
    constraint fk_produto_favorito
		foreign key (cd_produto)
			references produto(cd_produto) on delete cascade,
            
	constraint fk_favorito_produto_cliente
		foreign key (cd_cliente)
			references cliente(cd_cliente) on delete cascade,
            
	constraint fk_favorito_cardapio
		foreign key (cd_cardapio)
			references cardapio(cd_cardapio) on delete cascade
);

create table if not exists cupons(
		cd_cupom int auto_increment,
		vl_cupom decimal(10,2),
        dt_validade_cupom datetime,
        cd_carrinho int,
        cd_cliente int,
        
        constraint pk_cupom
			primary key (cd_cupom),
            
	constraint fk_cupom_cliente
		foreign key (cd_cliente)
			references cliente(cd_cliente) on delete cascade,   
            
	constraint fk_cupom_carrinho
		foreign key (cd_carrinho)
			references carrinho(cd_carrinho) on delete cascade

);

create table notificacao (
	cd_notificacao int auto_increment,
	cd_cliente int,
    ds_titulo text(500),
    ds_descricao text(500),
    ds_tipo enum('Reserva','Pedido','Clube'),
    ds_vizu boolean,
    
    constraint pk_notifi
			primary key (cd_notificacao),
            
	constraint fk_notifi_cliente
		foreign key (cd_cliente)
			references cliente(cd_cliente) on delete cascade  
);

-- ///////// PROCEDURE DE CRIAÇÃO /////////
delimiter $$ 
create procedure adicionar_cliente(
	in nome varchar(45),
    in sobrenomeC varchar(45),
    in emailC varchar(100),
    in senhaC varchar(100),
    in telefoneC varchar(15)
)
begin
if exists(select cd_cliente from cliente where ds_emailC = emailC) then
	select concat('Esse E-mail ja esta sendo utilizado, faça login') as Erro;
    else
	insert into cliente(nm_cliente, nm_sobrenomeC, ds_emailC, ds_senhaC, nmr_telefoneC)
		values (nome, sobrenomeC, emailC, senhaC, telefoneC);
	select concat(nome , ' foi cadastrado com sucesso :)' ) as Concluido;
	end if;
end $$
delimiter ;


delimiter $$ 
create procedure adicionar_barraqueiro(
	in nome varchar(45),
    in sobrenomeB varchar(45),
    in emailB varchar(100),
    in senhaB varchar(100),
    in telefoneB varchar(15),
    in cpfB char (15) 
)
begin
if exists(select cd_barraqueiro from barraqueiro where ds_emailB = emailB) then
	select concat('Esse E-mail ja esta sendo utilizado, faça login') as Erro;
    else
	insert into barraqueiro(nm_barraqueiro, nm_sobrenomeB, ds_emailB, ds_senhaB, nmr_telefoneB, cd_cpfB,  cd_plano,
    cd_token)
		values (nome, sobrenomeB, emailB, senhaB, telefoneB, cpfB, null, null);
	select concat(nome , ' foi cadastrado com sucesso :)' ) as Concluido;
	end if;
end $$
delimiter ;
drop procedure adicionar_barraqueiro;

delimiter $$

create trigger checar_emailB
before insert on barraqueiro
for each row
begin
    if exists (select 1 from cliente where cliente.ds_emailC = new.ds_emailB) then
        signal sqlstate '45000' set message_text = 'Uma conta Banhista já está utilizando esse email, por favor tente outro';
    end if;
end $$

delimiter ;

drop trigger checar_emailB;

delimiter $$

create trigger checar_emailC
before insert on cliente
for each row 
begin
    if exists (select 1 from barraqueiro where barraqueiro.ds_emailB = new.ds_emailC) then
        signal sqlstate '45000' set message_text = 'Uma conta Barraqueiro já está utilizando esse email, por favor tente outro';
    end if;
end $$


delimiter ;

drop trigger checar_emailC;

insert into barraqueiro values (110,'Rafael','Dantas','rafaeldantas@gmail.com', 48935984628 , 426879513 , 13988357898, null, null);

insert into cliente values (86, 'fernanda', 'fefe', 'rafaeldantas@gmail.com', '1234', '13996032814');

insert into barraqueiro values (10,'Rafael','Dantas','biel@gmail.com', 48935984628 , 426879513 , 13988357898, null, null);

insert into cliente values (88, 'fernanda', 'fefe', 'biel@gmail.com', '1234', '13996032814');

select * from barraqueiro;

select * from cliente;

-- teste

select * from notificacao;

-- ////////// INSERT //////////////

insert into clube values (2, 2,'Carrinho da abobora');

select * from barraqueiro;

insert into carrinho values(2,1,'Barraquinha testinha', 'Barraquinha do amor, com muita comida boa e alegria','Com vaga');

insert into reserva values (1,2,2, '2024-02-07', '12:00', 55.02);

insert into pedido values (1,2,2, 58.12, 'G5');

drop table clube_usuario;

insert into clube_usuario values (2,2, 'Carrinho da abobora', 785);

drop table clube_usuario;

insert into clube_usuario values (2,2, 'Carrinho da abobora', 785);

insert into plano value 
	(1,'aa', '2025-05-31', 40);
    
     insert into cliente values 
	(11,'Rafael','Dantas','rafaeldan@gmail.com',48958,13988357898);
    
    
    insert into cliente values (25, 'fernanda', 'fefe', 'rafaeldantas@gmail.com', '1234', '13996032814');

insert into cupons values (4, 50, '2024-05-02 00:00:00', 2,2);

insert into barraqueiro values 
	(1,'Rafael','Dantas','rafaeldantas@gmail.com',48935984628,426879513,13988357898, null, null);
    
insert into barraqueiro values 
	(44,'Rafael','Dantas','rafaeldan
    tas@gmail.com',48935984628,426879513,13988357898, 1, null);

insert into barraqueiro values 
	(5,'Rafael','Dantas','rafaeldantas@gmail.com',48935984628,426879513,13988357898, 1, null);
    
    insert into barraqueiro values 
	(14,'Rafael','Dantas','rafaeldantas@gmail.com',48935984628,426879513,13988357898, 1, null);
    
    insert into cliente values 
	(8,'Rafael','Dantas','rafaeldantas@gmail.com',48935984628,13988357898);
    
     insert into cliente values 
	(11,'Rafael','Dantas','rafaeldantas@gmail.com',48935984628,13988357898);

update carrinho set ds_localizacao = 'Carrinho de otima qualidade, proximo ao canal 3, com uma variedade imensa de produtos' where cd_carrinho = 1;
 
 
 insert into cardapio values 
	(1,1);
		
insert into produto values
	(1,1,'isca de frango','Deliciosas tiras de frango empanadas e fritas até a perfeição, servidas com batatas fritas crocantes. Um prato irresistível para os amantes de frango.',60,'salgado'),
    (2,1,'pastel de frango','Pastel crocante recheado com suculento frango desfiado, temperado com especiarias que garantem um sabor inesquecível. Disponível em diversas variedades para agradar todos os paladares.', 15, 'salgado'),
    (3,1,'pastel de carne','Pastel frito na hora, recheado com carne moída suculenta e bem temperada. Perfeito para quem adora um salgado tradicional, com várias opções para variar no sabor.', 15, 'salgado'),
    (4,1,'espetinho','Saborosos espetinhos de churrasco, grelhados à perfeição, trazendo o autêntico sabor do churrasco brasileiro. Uma excelente escolha para um lanche rápido e saboroso.', 10, 'salgado');


insert into clube values 
(1,1, 'amém');

insert into clube_usuario values 
(1, 1, '100');	

select * from clube_usuario;

select * from pedido;
select * from sacola;

select * from cliente;


-- ///////// PROCEDURE DE ATUALIZAÇÃO /////////
delimiter $$
create procedure atualiza_cliente(
	in email varchar(100),
    in nome varchar(45),
	in sobrenomeC varchar(45)
)
begin
	declare cliente int;
	select count(*) into cliente from cliente where ds_emailC = email;
    if cliente > 0 then
		update cliente set nm_cliente = nome where ds_emailC = email;
		update cliente set nm_sobrenomeC = sobrenomeC where ds_emailC = email;
        select 'Nome atualizado' as sucesso;
        else
        select 'usuario não encontrado' as erro;
	end if;
    end $$
delimiter ;


-- ///////// PROCEDURE DE EXCLUSÃO /////////
delimiter $$
create procedure excluir_cliente(
	in email varchar (100)
)
begin
	if exists (select cd_cliente from cliente where ds_emailC = email) then
		delete from cliente where ds_emailC = email;
			select('Essa conta foi excluida') as Exclui;
	end if;
    end $$
delimiter ;

/*drop table sacola;
drop table pedido;*/
