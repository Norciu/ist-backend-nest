CREATE TABLE localizations.simc (
    woj varchar(3),
    pow varchar(3),
    gmi varchar(3),
    rodz_gmi varchar(3),
    rm varchar(3),
    mz varchar(3),
    nazwa varchar(100),
    sym varchar(7),
    sympod varchar(7),
    stan_na date
);

CREATE TABLE localizations.ulic (
    woj varchar(3),
    pow varchar(3),
    gmi varchar(3),
    rodz_gmi varchar(3),
    sym varchar(7),
    sym_ul varchar(5),
    cecha varchar(20),
    nazwa_1 varchar(150),
    nazwa_2 varchar(150),
    stan_na date
);

CREATE TABLE localizations.postal_codes (
    code varchar(6),
    address varchar,
    city varchar(100),
    woj varchar,
    pow varchar
);

INSERT INTO localizations.city (city_name, postal_code, simc)
 (
        SELECT nazwa,
               floor(random() * 10)::INT::CHAR || floor(random() * 10)::INT || '-' || floor(random() * 10)::INT || floor(random() * 10)::INT || floor(random() * 10)::INT,
               sym
        FROM localizations.simc ls
        );

INSERT INTO localizations.street (street_name, ulic, city_id_id) (
    SELECT u.nazwa_1, u.sym_ul, lc.id
    FROM localizations.ulic u
    LEFT JOIN localizations.city lc ON lc.simc = u.sym
);
