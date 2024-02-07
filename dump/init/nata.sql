PGDMP                         {            nata #   14.8 (Ubuntu 14.8-0ubuntu0.22.04.1) #   14.8 (Ubuntu 14.8-0ubuntu0.22.04.1) s   �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16575    nata    DATABASE     U   CREATE DATABASE nata WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'C.UTF-8';
    DROP DATABASE nata;
                admin_db    false            �            1259    16611    admin_permissions    TABLE     J  CREATE TABLE public.admin_permissions (
    id integer NOT NULL,
    action character varying(255),
    subject character varying(255),
    properties jsonb,
    conditions jsonb,
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer
);
 %   DROP TABLE public.admin_permissions;
       public         heap    admin_db    false            �            1259    16610    admin_permissions_id_seq    SEQUENCE     �   CREATE SEQUENCE public.admin_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.admin_permissions_id_seq;
       public          admin_db    false    218            �           0    0    admin_permissions_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.admin_permissions_id_seq OWNED BY public.admin_permissions.id;
          public          admin_db    false    217            �            1259    16758    admin_permissions_role_links    TABLE     �   CREATE TABLE public.admin_permissions_role_links (
    id integer NOT NULL,
    permission_id integer,
    role_id integer,
    permission_order double precision
);
 0   DROP TABLE public.admin_permissions_role_links;
       public         heap    admin_db    false            �            1259    16757 #   admin_permissions_role_links_id_seq    SEQUENCE     �   CREATE SEQUENCE public.admin_permissions_role_links_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 :   DROP SEQUENCE public.admin_permissions_role_links_id_seq;
       public          admin_db    false    244            �           0    0 #   admin_permissions_role_links_id_seq    SEQUENCE OWNED BY     k   ALTER SEQUENCE public.admin_permissions_role_links_id_seq OWNED BY public.admin_permissions_role_links.id;
          public          admin_db    false    243            �            1259    16633    admin_roles    TABLE     ;  CREATE TABLE public.admin_roles (
    id integer NOT NULL,
    name character varying(255),
    code character varying(255),
    description character varying(255),
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer
);
    DROP TABLE public.admin_roles;
       public         heap    admin_db    false            �            1259    16632    admin_roles_id_seq    SEQUENCE     �   CREATE SEQUENCE public.admin_roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.admin_roles_id_seq;
       public          admin_db    false    222            �           0    0    admin_roles_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.admin_roles_id_seq OWNED BY public.admin_roles.id;
          public          admin_db    false    221            �            1259    16622    admin_users    TABLE     B  CREATE TABLE public.admin_users (
    id integer NOT NULL,
    firstname character varying(255),
    lastname character varying(255),
    username character varying(255),
    email character varying(255),
    password character varying(255),
    reset_password_token character varying(255),
    registration_token character varying(255),
    is_active boolean,
    blocked boolean,
    prefered_language character varying(255),
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer
);
    DROP TABLE public.admin_users;
       public         heap    admin_db    false            �            1259    16621    admin_users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.admin_users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.admin_users_id_seq;
       public          admin_db    false    220            �           0    0    admin_users_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.admin_users_id_seq OWNED BY public.admin_users.id;
          public          admin_db    false    219            �            1259    16770    admin_users_roles_links    TABLE     �   CREATE TABLE public.admin_users_roles_links (
    id integer NOT NULL,
    user_id integer,
    role_id integer,
    role_order double precision,
    user_order double precision
);
 +   DROP TABLE public.admin_users_roles_links;
       public         heap    admin_db    false            �            1259    16769    admin_users_roles_links_id_seq    SEQUENCE     �   CREATE SEQUENCE public.admin_users_roles_links_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.admin_users_roles_links_id_seq;
       public          admin_db    false    246            �           0    0    admin_users_roles_links_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.admin_users_roles_links_id_seq OWNED BY public.admin_users_roles_links.id;
          public          admin_db    false    245            �            1259    16684    files    TABLE     �  CREATE TABLE public.files (
    id integer NOT NULL,
    name character varying(255),
    alternative_text character varying(255),
    caption character varying(255),
    width integer,
    height integer,
    formats jsonb,
    hash character varying(255),
    ext character varying(255),
    mime character varying(255),
    size numeric(10,2),
    url character varying(255),
    preview_url character varying(255),
    provider character varying(255),
    provider_metadata jsonb,
    folder_path character varying(255),
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer
);
    DROP TABLE public.files;
       public         heap    admin_db    false            �            1259    16819    files_folder_links    TABLE     �   CREATE TABLE public.files_folder_links (
    id integer NOT NULL,
    file_id integer,
    folder_id integer,
    file_order double precision
);
 &   DROP TABLE public.files_folder_links;
       public         heap    admin_db    false            �            1259    16818    files_folder_links_id_seq    SEQUENCE     �   CREATE SEQUENCE public.files_folder_links_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.files_folder_links_id_seq;
       public          admin_db    false    254            �           0    0    files_folder_links_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.files_folder_links_id_seq OWNED BY public.files_folder_links.id;
          public          admin_db    false    253            �            1259    16683    files_id_seq    SEQUENCE     �   CREATE SEQUENCE public.files_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.files_id_seq;
       public          admin_db    false    232            �           0    0    files_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.files_id_seq OWNED BY public.files.id;
          public          admin_db    false    231            �            1259    16807    files_related_morphs    TABLE     �   CREATE TABLE public.files_related_morphs (
    id integer NOT NULL,
    file_id integer,
    related_id integer,
    related_type character varying(255),
    field character varying(255),
    "order" double precision
);
 (   DROP TABLE public.files_related_morphs;
       public         heap    admin_db    false            �            1259    16806    files_related_morphs_id_seq    SEQUENCE     �   CREATE SEQUENCE public.files_related_morphs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.files_related_morphs_id_seq;
       public          admin_db    false    252            �           0    0    files_related_morphs_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.files_related_morphs_id_seq OWNED BY public.files_related_morphs.id;
          public          admin_db    false    251            �            1259    16747    i18n_locale    TABLE       CREATE TABLE public.i18n_locale (
    id integer NOT NULL,
    name character varying(255),
    code character varying(255),
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer
);
    DROP TABLE public.i18n_locale;
       public         heap    admin_db    false            �            1259    16746    i18n_locale_id_seq    SEQUENCE     �   CREATE SEQUENCE public.i18n_locale_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.i18n_locale_id_seq;
       public          admin_db    false    242            �           0    0    i18n_locale_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.i18n_locale_id_seq OWNED BY public.i18n_locale.id;
          public          admin_db    false    241                       1259    17115 	   languages    TABLE     T  CREATE TABLE public.languages (
    id integer NOT NULL,
    nom character varying(255),
    code character varying(255),
    actif boolean,
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    published_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer
);
    DROP TABLE public.languages;
       public         heap    admin_db    false                       1259    17114    languages_id_seq    SEQUENCE     �   CREATE SEQUENCE public.languages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.languages_id_seq;
       public          admin_db    false    262            �           0    0    languages_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.languages_id_seq OWNED BY public.languages.id;
          public          admin_db    false    261                       1259    17138 	   questions    TABLE     f  CREATE TABLE public.questions (
    id integer NOT NULL,
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    published_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer,
    locale character varying(255),
    label character varying(255),
    code character varying(255)
);
    DROP TABLE public.questions;
       public         heap    admin_db    false                       1259    17137    questions_id_seq    SEQUENCE     �   CREATE SEQUENCE public.questions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.questions_id_seq;
       public          admin_db    false    264            �           0    0    questions_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.questions_id_seq OWNED BY public.questions.id;
          public          admin_db    false    263            
           1259    17149    questions_localizations_links    TABLE     �   CREATE TABLE public.questions_localizations_links (
    id integer NOT NULL,
    question_id integer,
    inv_question_id integer,
    question_order double precision
);
 1   DROP TABLE public.questions_localizations_links;
       public         heap    admin_db    false            	           1259    17148 $   questions_localizations_links_id_seq    SEQUENCE     �   CREATE SEQUENCE public.questions_localizations_links_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public.questions_localizations_links_id_seq;
       public          admin_db    false    266            �           0    0 $   questions_localizations_links_id_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public.questions_localizations_links_id_seq OWNED BY public.questions_localizations_links.id;
          public          admin_db    false    265                       1259    17198 	   responses    TABLE     g  CREATE TABLE public.responses (
    id integer NOT NULL,
    value character varying(255),
    label character varying(255),
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    published_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer,
    locale character varying(255)
);
    DROP TABLE public.responses;
       public         heap    admin_db    false                       1259    17197    responses_id_seq    SEQUENCE     �   CREATE SEQUENCE public.responses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.responses_id_seq;
       public          admin_db    false    268            �           0    0    responses_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.responses_id_seq OWNED BY public.responses.id;
          public          admin_db    false    267                       1259    17221    responses_localizations_links    TABLE     �   CREATE TABLE public.responses_localizations_links (
    id integer NOT NULL,
    response_id integer,
    inv_response_id integer,
    response_order double precision
);
 1   DROP TABLE public.responses_localizations_links;
       public         heap    admin_db    false                       1259    17220 $   responses_localizations_links_id_seq    SEQUENCE     �   CREATE SEQUENCE public.responses_localizations_links_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public.responses_localizations_links_id_seq;
       public          admin_db    false    272            �           0    0 $   responses_localizations_links_id_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public.responses_localizations_links_id_seq OWNED BY public.responses_localizations_links.id;
          public          admin_db    false    271                       1259    17209    responses_question_links    TABLE     �   CREATE TABLE public.responses_question_links (
    id integer NOT NULL,
    response_id integer,
    question_id integer,
    response_order double precision
);
 ,   DROP TABLE public.responses_question_links;
       public         heap    admin_db    false                       1259    17208    responses_question_links_id_seq    SEQUENCE     �   CREATE SEQUENCE public.responses_question_links_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.responses_question_links_id_seq;
       public          admin_db    false    270            �           0    0    responses_question_links_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.responses_question_links_id_seq OWNED BY public.responses_question_links.id;
          public          admin_db    false    269            �            1259    16655    strapi_api_token_permissions    TABLE       CREATE TABLE public.strapi_api_token_permissions (
    id integer NOT NULL,
    action character varying(255),
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer
);
 0   DROP TABLE public.strapi_api_token_permissions;
       public         heap    admin_db    false            �            1259    16654 #   strapi_api_token_permissions_id_seq    SEQUENCE     �   CREATE SEQUENCE public.strapi_api_token_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 :   DROP SEQUENCE public.strapi_api_token_permissions_id_seq;
       public          admin_db    false    226            �           0    0 #   strapi_api_token_permissions_id_seq    SEQUENCE OWNED BY     k   ALTER SEQUENCE public.strapi_api_token_permissions_id_seq OWNED BY public.strapi_api_token_permissions.id;
          public          admin_db    false    225            �            1259    16783 (   strapi_api_token_permissions_token_links    TABLE     �   CREATE TABLE public.strapi_api_token_permissions_token_links (
    id integer NOT NULL,
    api_token_permission_id integer,
    api_token_id integer,
    api_token_permission_order double precision
);
 <   DROP TABLE public.strapi_api_token_permissions_token_links;
       public         heap    admin_db    false            �            1259    16782 /   strapi_api_token_permissions_token_links_id_seq    SEQUENCE     �   CREATE SEQUENCE public.strapi_api_token_permissions_token_links_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 F   DROP SEQUENCE public.strapi_api_token_permissions_token_links_id_seq;
       public          admin_db    false    248            �           0    0 /   strapi_api_token_permissions_token_links_id_seq    SEQUENCE OWNED BY     �   ALTER SEQUENCE public.strapi_api_token_permissions_token_links_id_seq OWNED BY public.strapi_api_token_permissions_token_links.id;
          public          admin_db    false    247            �            1259    16644    strapi_api_tokens    TABLE     �  CREATE TABLE public.strapi_api_tokens (
    id integer NOT NULL,
    name character varying(255),
    description character varying(255),
    type character varying(255),
    access_key character varying(255),
    last_used_at timestamp(6) without time zone,
    expires_at timestamp(6) without time zone,
    lifespan bigint,
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer
);
 %   DROP TABLE public.strapi_api_tokens;
       public         heap    admin_db    false            �            1259    16643    strapi_api_tokens_id_seq    SEQUENCE     �   CREATE SEQUENCE public.strapi_api_tokens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.strapi_api_tokens_id_seq;
       public          admin_db    false    224            �           0    0    strapi_api_tokens_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.strapi_api_tokens_id_seq OWNED BY public.strapi_api_tokens.id;
          public          admin_db    false    223            �            1259    16593    strapi_core_store_settings    TABLE     �   CREATE TABLE public.strapi_core_store_settings (
    id integer NOT NULL,
    key character varying(255),
    value text,
    type character varying(255),
    environment character varying(255),
    tag character varying(255)
);
 .   DROP TABLE public.strapi_core_store_settings;
       public         heap    admin_db    false            �            1259    16592 !   strapi_core_store_settings_id_seq    SEQUENCE     �   CREATE SEQUENCE public.strapi_core_store_settings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public.strapi_core_store_settings_id_seq;
       public          admin_db    false    214            �           0    0 !   strapi_core_store_settings_id_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public.strapi_core_store_settings_id_seq OWNED BY public.strapi_core_store_settings.id;
          public          admin_db    false    213            �            1259    16584    strapi_database_schema    TABLE     �   CREATE TABLE public.strapi_database_schema (
    id integer NOT NULL,
    schema json,
    "time" timestamp without time zone,
    hash character varying(255)
);
 *   DROP TABLE public.strapi_database_schema;
       public         heap    admin_db    false            �            1259    16583    strapi_database_schema_id_seq    SEQUENCE     �   CREATE SEQUENCE public.strapi_database_schema_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.strapi_database_schema_id_seq;
       public          admin_db    false    212            �           0    0    strapi_database_schema_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.strapi_database_schema_id_seq OWNED BY public.strapi_database_schema.id;
          public          admin_db    false    211            �            1259    16577    strapi_migrations    TABLE     �   CREATE TABLE public.strapi_migrations (
    id integer NOT NULL,
    name character varying(255),
    "time" timestamp without time zone
);
 %   DROP TABLE public.strapi_migrations;
       public         heap    admin_db    false            �            1259    16576    strapi_migrations_id_seq    SEQUENCE     �   CREATE SEQUENCE public.strapi_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.strapi_migrations_id_seq;
       public          admin_db    false    210            �           0    0    strapi_migrations_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.strapi_migrations_id_seq OWNED BY public.strapi_migrations.id;
          public          admin_db    false    209            �            1259    16675 !   strapi_transfer_token_permissions    TABLE     
  CREATE TABLE public.strapi_transfer_token_permissions (
    id integer NOT NULL,
    action character varying(255),
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer
);
 5   DROP TABLE public.strapi_transfer_token_permissions;
       public         heap    admin_db    false            �            1259    16674 (   strapi_transfer_token_permissions_id_seq    SEQUENCE     �   CREATE SEQUENCE public.strapi_transfer_token_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ?   DROP SEQUENCE public.strapi_transfer_token_permissions_id_seq;
       public          admin_db    false    230            �           0    0 (   strapi_transfer_token_permissions_id_seq    SEQUENCE OWNED BY     u   ALTER SEQUENCE public.strapi_transfer_token_permissions_id_seq OWNED BY public.strapi_transfer_token_permissions.id;
          public          admin_db    false    229            �            1259    16795 -   strapi_transfer_token_permissions_token_links    TABLE     �   CREATE TABLE public.strapi_transfer_token_permissions_token_links (
    id integer NOT NULL,
    transfer_token_permission_id integer,
    transfer_token_id integer,
    transfer_token_permission_order double precision
);
 A   DROP TABLE public.strapi_transfer_token_permissions_token_links;
       public         heap    admin_db    false            �            1259    16794 4   strapi_transfer_token_permissions_token_links_id_seq    SEQUENCE     �   CREATE SEQUENCE public.strapi_transfer_token_permissions_token_links_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 K   DROP SEQUENCE public.strapi_transfer_token_permissions_token_links_id_seq;
       public          admin_db    false    250            �           0    0 4   strapi_transfer_token_permissions_token_links_id_seq    SEQUENCE OWNED BY     �   ALTER SEQUENCE public.strapi_transfer_token_permissions_token_links_id_seq OWNED BY public.strapi_transfer_token_permissions_token_links.id;
          public          admin_db    false    249            �            1259    16664    strapi_transfer_tokens    TABLE     �  CREATE TABLE public.strapi_transfer_tokens (
    id integer NOT NULL,
    name character varying(255),
    description character varying(255),
    access_key character varying(255),
    last_used_at timestamp(6) without time zone,
    expires_at timestamp(6) without time zone,
    lifespan bigint,
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer
);
 *   DROP TABLE public.strapi_transfer_tokens;
       public         heap    admin_db    false            �            1259    16663    strapi_transfer_tokens_id_seq    SEQUENCE     �   CREATE SEQUENCE public.strapi_transfer_tokens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.strapi_transfer_tokens_id_seq;
       public          admin_db    false    228            �           0    0    strapi_transfer_tokens_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.strapi_transfer_tokens_id_seq OWNED BY public.strapi_transfer_tokens.id;
          public          admin_db    false    227            �            1259    16602    strapi_webhooks    TABLE     �   CREATE TABLE public.strapi_webhooks (
    id integer NOT NULL,
    name character varying(255),
    url text,
    headers jsonb,
    events jsonb,
    enabled boolean
);
 #   DROP TABLE public.strapi_webhooks;
       public         heap    admin_db    false            �            1259    16601    strapi_webhooks_id_seq    SEQUENCE     �   CREATE SEQUENCE public.strapi_webhooks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.strapi_webhooks_id_seq;
       public          admin_db    false    216            �           0    0    strapi_webhooks_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.strapi_webhooks_id_seq OWNED BY public.strapi_webhooks.id;
          public          admin_db    false    215            �            1259    16716    up_permissions    TABLE     �   CREATE TABLE public.up_permissions (
    id integer NOT NULL,
    action character varying(255),
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer
);
 "   DROP TABLE public.up_permissions;
       public         heap    admin_db    false            �            1259    16715    up_permissions_id_seq    SEQUENCE     �   CREATE SEQUENCE public.up_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.up_permissions_id_seq;
       public          admin_db    false    236            �           0    0    up_permissions_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.up_permissions_id_seq OWNED BY public.up_permissions.id;
          public          admin_db    false    235                       1259    16843    up_permissions_role_links    TABLE     �   CREATE TABLE public.up_permissions_role_links (
    id integer NOT NULL,
    permission_id integer,
    role_id integer,
    permission_order double precision
);
 -   DROP TABLE public.up_permissions_role_links;
       public         heap    admin_db    false                       1259    16842     up_permissions_role_links_id_seq    SEQUENCE     �   CREATE SEQUENCE public.up_permissions_role_links_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public.up_permissions_role_links_id_seq;
       public          admin_db    false    258            �           0    0     up_permissions_role_links_id_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public.up_permissions_role_links_id_seq OWNED BY public.up_permissions_role_links.id;
          public          admin_db    false    257            �            1259    16725    up_roles    TABLE     8  CREATE TABLE public.up_roles (
    id integer NOT NULL,
    name character varying(255),
    description character varying(255),
    type character varying(255),
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer
);
    DROP TABLE public.up_roles;
       public         heap    admin_db    false            �            1259    16724    up_roles_id_seq    SEQUENCE     �   CREATE SEQUENCE public.up_roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.up_roles_id_seq;
       public          admin_db    false    238            �           0    0    up_roles_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.up_roles_id_seq OWNED BY public.up_roles.id;
          public          admin_db    false    237            �            1259    16736    up_users    TABLE     �  CREATE TABLE public.up_users (
    id integer NOT NULL,
    username character varying(255),
    email character varying(255),
    provider character varying(255),
    password character varying(255),
    reset_password_token character varying(255),
    confirmation_token character varying(255),
    confirmed boolean,
    blocked boolean,
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer
);
    DROP TABLE public.up_users;
       public         heap    admin_db    false            �            1259    16735    up_users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.up_users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.up_users_id_seq;
       public          admin_db    false    240            �           0    0    up_users_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.up_users_id_seq OWNED BY public.up_users.id;
          public          admin_db    false    239                       1259    16855    up_users_role_links    TABLE     �   CREATE TABLE public.up_users_role_links (
    id integer NOT NULL,
    user_id integer,
    role_id integer,
    user_order double precision
);
 '   DROP TABLE public.up_users_role_links;
       public         heap    admin_db    false                       1259    16854    up_users_role_links_id_seq    SEQUENCE     �   CREATE SEQUENCE public.up_users_role_links_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.up_users_role_links_id_seq;
       public          admin_db    false    260            �           0    0    up_users_role_links_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.up_users_role_links_id_seq OWNED BY public.up_users_role_links.id;
          public          admin_db    false    259            �            1259    16701    upload_folders    TABLE     +  CREATE TABLE public.upload_folders (
    id integer NOT NULL,
    name character varying(255),
    path_id integer,
    path character varying(255),
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer
);
 "   DROP TABLE public.upload_folders;
       public         heap    admin_db    false            �            1259    16700    upload_folders_id_seq    SEQUENCE     �   CREATE SEQUENCE public.upload_folders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.upload_folders_id_seq;
       public          admin_db    false    234            �           0    0    upload_folders_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.upload_folders_id_seq OWNED BY public.upload_folders.id;
          public          admin_db    false    233                        1259    16831    upload_folders_parent_links    TABLE     �   CREATE TABLE public.upload_folders_parent_links (
    id integer NOT NULL,
    folder_id integer,
    inv_folder_id integer,
    folder_order double precision
);
 /   DROP TABLE public.upload_folders_parent_links;
       public         heap    admin_db    false            �            1259    16830 "   upload_folders_parent_links_id_seq    SEQUENCE     �   CREATE SEQUENCE public.upload_folders_parent_links_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public.upload_folders_parent_links_id_seq;
       public          admin_db    false    256            �           0    0 "   upload_folders_parent_links_id_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public.upload_folders_parent_links_id_seq OWNED BY public.upload_folders_parent_links.id;
          public          admin_db    false    255                       2604    16614    admin_permissions id    DEFAULT     |   ALTER TABLE ONLY public.admin_permissions ALTER COLUMN id SET DEFAULT nextval('public.admin_permissions_id_seq'::regclass);
 C   ALTER TABLE public.admin_permissions ALTER COLUMN id DROP DEFAULT;
       public          admin_db    false    217    218    218                       2604    16761    admin_permissions_role_links id    DEFAULT     �   ALTER TABLE ONLY public.admin_permissions_role_links ALTER COLUMN id SET DEFAULT nextval('public.admin_permissions_role_links_id_seq'::regclass);
 N   ALTER TABLE public.admin_permissions_role_links ALTER COLUMN id DROP DEFAULT;
       public          admin_db    false    244    243    244                       2604    16636    admin_roles id    DEFAULT     p   ALTER TABLE ONLY public.admin_roles ALTER COLUMN id SET DEFAULT nextval('public.admin_roles_id_seq'::regclass);
 =   ALTER TABLE public.admin_roles ALTER COLUMN id DROP DEFAULT;
       public          admin_db    false    222    221    222                       2604    16625    admin_users id    DEFAULT     p   ALTER TABLE ONLY public.admin_users ALTER COLUMN id SET DEFAULT nextval('public.admin_users_id_seq'::regclass);
 =   ALTER TABLE public.admin_users ALTER COLUMN id DROP DEFAULT;
       public          admin_db    false    220    219    220                       2604    16773    admin_users_roles_links id    DEFAULT     �   ALTER TABLE ONLY public.admin_users_roles_links ALTER COLUMN id SET DEFAULT nextval('public.admin_users_roles_links_id_seq'::regclass);
 I   ALTER TABLE public.admin_users_roles_links ALTER COLUMN id DROP DEFAULT;
       public          admin_db    false    245    246    246            	           2604    16687    files id    DEFAULT     d   ALTER TABLE ONLY public.files ALTER COLUMN id SET DEFAULT nextval('public.files_id_seq'::regclass);
 7   ALTER TABLE public.files ALTER COLUMN id DROP DEFAULT;
       public          admin_db    false    232    231    232                       2604    16822    files_folder_links id    DEFAULT     ~   ALTER TABLE ONLY public.files_folder_links ALTER COLUMN id SET DEFAULT nextval('public.files_folder_links_id_seq'::regclass);
 D   ALTER TABLE public.files_folder_links ALTER COLUMN id DROP DEFAULT;
       public          admin_db    false    253    254    254                       2604    16810    files_related_morphs id    DEFAULT     �   ALTER TABLE ONLY public.files_related_morphs ALTER COLUMN id SET DEFAULT nextval('public.files_related_morphs_id_seq'::regclass);
 F   ALTER TABLE public.files_related_morphs ALTER COLUMN id DROP DEFAULT;
       public          admin_db    false    251    252    252                       2604    16750    i18n_locale id    DEFAULT     p   ALTER TABLE ONLY public.i18n_locale ALTER COLUMN id SET DEFAULT nextval('public.i18n_locale_id_seq'::regclass);
 =   ALTER TABLE public.i18n_locale ALTER COLUMN id DROP DEFAULT;
       public          admin_db    false    242    241    242                       2604    17118    languages id    DEFAULT     l   ALTER TABLE ONLY public.languages ALTER COLUMN id SET DEFAULT nextval('public.languages_id_seq'::regclass);
 ;   ALTER TABLE public.languages ALTER COLUMN id DROP DEFAULT;
       public          admin_db    false    261    262    262                       2604    17141    questions id    DEFAULT     l   ALTER TABLE ONLY public.questions ALTER COLUMN id SET DEFAULT nextval('public.questions_id_seq'::regclass);
 ;   ALTER TABLE public.questions ALTER COLUMN id DROP DEFAULT;
       public          admin_db    false    263    264    264                       2604    17152     questions_localizations_links id    DEFAULT     �   ALTER TABLE ONLY public.questions_localizations_links ALTER COLUMN id SET DEFAULT nextval('public.questions_localizations_links_id_seq'::regclass);
 O   ALTER TABLE public.questions_localizations_links ALTER COLUMN id DROP DEFAULT;
       public          admin_db    false    266    265    266                       2604    17201    responses id    DEFAULT     l   ALTER TABLE ONLY public.responses ALTER COLUMN id SET DEFAULT nextval('public.responses_id_seq'::regclass);
 ;   ALTER TABLE public.responses ALTER COLUMN id DROP DEFAULT;
       public          admin_db    false    268    267    268                       2604    17224     responses_localizations_links id    DEFAULT     �   ALTER TABLE ONLY public.responses_localizations_links ALTER COLUMN id SET DEFAULT nextval('public.responses_localizations_links_id_seq'::regclass);
 O   ALTER TABLE public.responses_localizations_links ALTER COLUMN id DROP DEFAULT;
       public          admin_db    false    271    272    272                       2604    17212    responses_question_links id    DEFAULT     �   ALTER TABLE ONLY public.responses_question_links ALTER COLUMN id SET DEFAULT nextval('public.responses_question_links_id_seq'::regclass);
 J   ALTER TABLE public.responses_question_links ALTER COLUMN id DROP DEFAULT;
       public          admin_db    false    270    269    270                       2604    16658    strapi_api_token_permissions id    DEFAULT     �   ALTER TABLE ONLY public.strapi_api_token_permissions ALTER COLUMN id SET DEFAULT nextval('public.strapi_api_token_permissions_id_seq'::regclass);
 N   ALTER TABLE public.strapi_api_token_permissions ALTER COLUMN id DROP DEFAULT;
       public          admin_db    false    226    225    226                       2604    16786 +   strapi_api_token_permissions_token_links id    DEFAULT     �   ALTER TABLE ONLY public.strapi_api_token_permissions_token_links ALTER COLUMN id SET DEFAULT nextval('public.strapi_api_token_permissions_token_links_id_seq'::regclass);
 Z   ALTER TABLE public.strapi_api_token_permissions_token_links ALTER COLUMN id DROP DEFAULT;
       public          admin_db    false    248    247    248                       2604    16647    strapi_api_tokens id    DEFAULT     |   ALTER TABLE ONLY public.strapi_api_tokens ALTER COLUMN id SET DEFAULT nextval('public.strapi_api_tokens_id_seq'::regclass);
 C   ALTER TABLE public.strapi_api_tokens ALTER COLUMN id DROP DEFAULT;
       public          admin_db    false    224    223    224                        2604    16596    strapi_core_store_settings id    DEFAULT     �   ALTER TABLE ONLY public.strapi_core_store_settings ALTER COLUMN id SET DEFAULT nextval('public.strapi_core_store_settings_id_seq'::regclass);
 L   ALTER TABLE public.strapi_core_store_settings ALTER COLUMN id DROP DEFAULT;
       public          admin_db    false    214    213    214            �           2604    16587    strapi_database_schema id    DEFAULT     �   ALTER TABLE ONLY public.strapi_database_schema ALTER COLUMN id SET DEFAULT nextval('public.strapi_database_schema_id_seq'::regclass);
 H   ALTER TABLE public.strapi_database_schema ALTER COLUMN id DROP DEFAULT;
       public          admin_db    false    211    212    212            �           2604    16580    strapi_migrations id    DEFAULT     |   ALTER TABLE ONLY public.strapi_migrations ALTER COLUMN id SET DEFAULT nextval('public.strapi_migrations_id_seq'::regclass);
 C   ALTER TABLE public.strapi_migrations ALTER COLUMN id DROP DEFAULT;
       public          admin_db    false    210    209    210                       2604    16678 $   strapi_transfer_token_permissions id    DEFAULT     �   ALTER TABLE ONLY public.strapi_transfer_token_permissions ALTER COLUMN id SET DEFAULT nextval('public.strapi_transfer_token_permissions_id_seq'::regclass);
 S   ALTER TABLE public.strapi_transfer_token_permissions ALTER COLUMN id DROP DEFAULT;
       public          admin_db    false    230    229    230                       2604    16798 0   strapi_transfer_token_permissions_token_links id    DEFAULT     �   ALTER TABLE ONLY public.strapi_transfer_token_permissions_token_links ALTER COLUMN id SET DEFAULT nextval('public.strapi_transfer_token_permissions_token_links_id_seq'::regclass);
 _   ALTER TABLE public.strapi_transfer_token_permissions_token_links ALTER COLUMN id DROP DEFAULT;
       public          admin_db    false    249    250    250                       2604    16667    strapi_transfer_tokens id    DEFAULT     �   ALTER TABLE ONLY public.strapi_transfer_tokens ALTER COLUMN id SET DEFAULT nextval('public.strapi_transfer_tokens_id_seq'::regclass);
 H   ALTER TABLE public.strapi_transfer_tokens ALTER COLUMN id DROP DEFAULT;
       public          admin_db    false    228    227    228                       2604    16605    strapi_webhooks id    DEFAULT     x   ALTER TABLE ONLY public.strapi_webhooks ALTER COLUMN id SET DEFAULT nextval('public.strapi_webhooks_id_seq'::regclass);
 A   ALTER TABLE public.strapi_webhooks ALTER COLUMN id DROP DEFAULT;
       public          admin_db    false    216    215    216                       2604    16719    up_permissions id    DEFAULT     v   ALTER TABLE ONLY public.up_permissions ALTER COLUMN id SET DEFAULT nextval('public.up_permissions_id_seq'::regclass);
 @   ALTER TABLE public.up_permissions ALTER COLUMN id DROP DEFAULT;
       public          admin_db    false    236    235    236                       2604    16846    up_permissions_role_links id    DEFAULT     �   ALTER TABLE ONLY public.up_permissions_role_links ALTER COLUMN id SET DEFAULT nextval('public.up_permissions_role_links_id_seq'::regclass);
 K   ALTER TABLE public.up_permissions_role_links ALTER COLUMN id DROP DEFAULT;
       public          admin_db    false    258    257    258                       2604    16728    up_roles id    DEFAULT     j   ALTER TABLE ONLY public.up_roles ALTER COLUMN id SET DEFAULT nextval('public.up_roles_id_seq'::regclass);
 :   ALTER TABLE public.up_roles ALTER COLUMN id DROP DEFAULT;
       public          admin_db    false    238    237    238                       2604    16739    up_users id    DEFAULT     j   ALTER TABLE ONLY public.up_users ALTER COLUMN id SET DEFAULT nextval('public.up_users_id_seq'::regclass);
 :   ALTER TABLE public.up_users ALTER COLUMN id DROP DEFAULT;
       public          admin_db    false    239    240    240                       2604    16858    up_users_role_links id    DEFAULT     �   ALTER TABLE ONLY public.up_users_role_links ALTER COLUMN id SET DEFAULT nextval('public.up_users_role_links_id_seq'::regclass);
 E   ALTER TABLE public.up_users_role_links ALTER COLUMN id DROP DEFAULT;
       public          admin_db    false    259    260    260            
           2604    16704    upload_folders id    DEFAULT     v   ALTER TABLE ONLY public.upload_folders ALTER COLUMN id SET DEFAULT nextval('public.upload_folders_id_seq'::regclass);
 @   ALTER TABLE public.upload_folders ALTER COLUMN id DROP DEFAULT;
       public          admin_db    false    234    233    234                       2604    16834    upload_folders_parent_links id    DEFAULT     �   ALTER TABLE ONLY public.upload_folders_parent_links ALTER COLUMN id SET DEFAULT nextval('public.upload_folders_parent_links_id_seq'::regclass);
 M   ALTER TABLE public.upload_folders_parent_links ALTER COLUMN id DROP DEFAULT;
       public          admin_db    false    256    255    256            �          0    16611    admin_permissions 
   TABLE DATA           �   COPY public.admin_permissions (id, action, subject, properties, conditions, created_at, updated_at, created_by_id, updated_by_id) FROM stdin;
    public          admin_db    false    218   �       �          0    16758    admin_permissions_role_links 
   TABLE DATA           d   COPY public.admin_permissions_role_links (id, permission_id, role_id, permission_order) FROM stdin;
    public          admin_db    false    244   �      �          0    16633    admin_roles 
   TABLE DATA           x   COPY public.admin_roles (id, name, code, description, created_at, updated_at, created_by_id, updated_by_id) FROM stdin;
    public          admin_db    false    222   O      �          0    16622    admin_users 
   TABLE DATA           �   COPY public.admin_users (id, firstname, lastname, username, email, password, reset_password_token, registration_token, is_active, blocked, prefered_language, created_at, updated_at, created_by_id, updated_by_id) FROM stdin;
    public          admin_db    false    220   3	      �          0    16770    admin_users_roles_links 
   TABLE DATA           _   COPY public.admin_users_roles_links (id, user_id, role_id, role_order, user_order) FROM stdin;
    public          admin_db    false    246   �	      �          0    16684    files 
   TABLE DATA           �   COPY public.files (id, name, alternative_text, caption, width, height, formats, hash, ext, mime, size, url, preview_url, provider, provider_metadata, folder_path, created_at, updated_at, created_by_id, updated_by_id) FROM stdin;
    public          admin_db    false    232   �	      �          0    16819    files_folder_links 
   TABLE DATA           P   COPY public.files_folder_links (id, file_id, folder_id, file_order) FROM stdin;
    public          admin_db    false    254   
      �          0    16807    files_related_morphs 
   TABLE DATA           e   COPY public.files_related_morphs (id, file_id, related_id, related_type, field, "order") FROM stdin;
    public          admin_db    false    252   5
      �          0    16747    i18n_locale 
   TABLE DATA           k   COPY public.i18n_locale (id, name, code, created_at, updated_at, created_by_id, updated_by_id) FROM stdin;
    public          admin_db    false    242   R
      �          0    17115 	   languages 
   TABLE DATA           }   COPY public.languages (id, nom, code, actif, created_at, updated_at, published_at, created_by_id, updated_by_id) FROM stdin;
    public          admin_db    false    262   �
      �          0    17138 	   questions 
   TABLE DATA           �   COPY public.questions (id, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, label, code) FROM stdin;
    public          admin_db    false    264   J      �          0    17149    questions_localizations_links 
   TABLE DATA           i   COPY public.questions_localizations_links (id, question_id, inv_question_id, question_order) FROM stdin;
    public          admin_db    false    266   �      �          0    17198 	   responses 
   TABLE DATA           �   COPY public.responses (id, value, label, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) FROM stdin;
    public          admin_db    false    268   !      �          0    17221    responses_localizations_links 
   TABLE DATA           i   COPY public.responses_localizations_links (id, response_id, inv_response_id, response_order) FROM stdin;
    public          admin_db    false    272   �      �          0    17209    responses_question_links 
   TABLE DATA           `   COPY public.responses_question_links (id, response_id, question_id, response_order) FROM stdin;
    public          admin_db    false    270   �      �          0    16655    strapi_api_token_permissions 
   TABLE DATA           x   COPY public.strapi_api_token_permissions (id, action, created_at, updated_at, created_by_id, updated_by_id) FROM stdin;
    public          admin_db    false    226   <      �          0    16783 (   strapi_api_token_permissions_token_links 
   TABLE DATA           �   COPY public.strapi_api_token_permissions_token_links (id, api_token_permission_id, api_token_id, api_token_permission_order) FROM stdin;
    public          admin_db    false    248   Y      �          0    16644    strapi_api_tokens 
   TABLE DATA           �   COPY public.strapi_api_tokens (id, name, description, type, access_key, last_used_at, expires_at, lifespan, created_at, updated_at, created_by_id, updated_by_id) FROM stdin;
    public          admin_db    false    224   v      �          0    16593    strapi_core_store_settings 
   TABLE DATA           \   COPY public.strapi_core_store_settings (id, key, value, type, environment, tag) FROM stdin;
    public          admin_db    false    214   +      �          0    16584    strapi_database_schema 
   TABLE DATA           J   COPY public.strapi_database_schema (id, schema, "time", hash) FROM stdin;
    public          admin_db    false    212   (      �          0    16577    strapi_migrations 
   TABLE DATA           =   COPY public.strapi_migrations (id, name, "time") FROM stdin;
    public          admin_db    false    210   1      �          0    16675 !   strapi_transfer_token_permissions 
   TABLE DATA           }   COPY public.strapi_transfer_token_permissions (id, action, created_at, updated_at, created_by_id, updated_by_id) FROM stdin;
    public          admin_db    false    230   :1      �          0    16795 -   strapi_transfer_token_permissions_token_links 
   TABLE DATA           �   COPY public.strapi_transfer_token_permissions_token_links (id, transfer_token_permission_id, transfer_token_id, transfer_token_permission_order) FROM stdin;
    public          admin_db    false    250   W1      �          0    16664    strapi_transfer_tokens 
   TABLE DATA           �   COPY public.strapi_transfer_tokens (id, name, description, access_key, last_used_at, expires_at, lifespan, created_at, updated_at, created_by_id, updated_by_id) FROM stdin;
    public          admin_db    false    228   t1      �          0    16602    strapi_webhooks 
   TABLE DATA           R   COPY public.strapi_webhooks (id, name, url, headers, events, enabled) FROM stdin;
    public          admin_db    false    216   �1      �          0    16716    up_permissions 
   TABLE DATA           j   COPY public.up_permissions (id, action, created_at, updated_at, created_by_id, updated_by_id) FROM stdin;
    public          admin_db    false    236   �1      �          0    16843    up_permissions_role_links 
   TABLE DATA           a   COPY public.up_permissions_role_links (id, permission_id, role_id, permission_order) FROM stdin;
    public          admin_db    false    258   x2      �          0    16725    up_roles 
   TABLE DATA           u   COPY public.up_roles (id, name, description, type, created_at, updated_at, created_by_id, updated_by_id) FROM stdin;
    public          admin_db    false    238   �2      �          0    16736    up_users 
   TABLE DATA           �   COPY public.up_users (id, username, email, provider, password, reset_password_token, confirmation_token, confirmed, blocked, created_at, updated_at, created_by_id, updated_by_id) FROM stdin;
    public          admin_db    false    240   G3      �          0    16855    up_users_role_links 
   TABLE DATA           O   COPY public.up_users_role_links (id, user_id, role_id, user_order) FROM stdin;
    public          admin_db    false    260   d3      �          0    16701    upload_folders 
   TABLE DATA           w   COPY public.upload_folders (id, name, path_id, path, created_at, updated_at, created_by_id, updated_by_id) FROM stdin;
    public          admin_db    false    234   �3      �          0    16831    upload_folders_parent_links 
   TABLE DATA           a   COPY public.upload_folders_parent_links (id, folder_id, inv_folder_id, folder_order) FROM stdin;
    public          admin_db    false    256   �3      �           0    0    admin_permissions_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.admin_permissions_id_seq', 98, true);
          public          admin_db    false    217            �           0    0 #   admin_permissions_role_links_id_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public.admin_permissions_role_links_id_seq', 113, true);
          public          admin_db    false    243            �           0    0    admin_roles_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.admin_roles_id_seq', 3, true);
          public          admin_db    false    221            �           0    0    admin_users_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.admin_users_id_seq', 1, true);
          public          admin_db    false    219            �           0    0    admin_users_roles_links_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.admin_users_roles_links_id_seq', 1, true);
          public          admin_db    false    245            �           0    0    files_folder_links_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.files_folder_links_id_seq', 1, false);
          public          admin_db    false    253            �           0    0    files_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.files_id_seq', 1, false);
          public          admin_db    false    231            �           0    0    files_related_morphs_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.files_related_morphs_id_seq', 1, false);
          public          admin_db    false    251            �           0    0    i18n_locale_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.i18n_locale_id_seq', 3, true);
          public          admin_db    false    241            �           0    0    languages_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.languages_id_seq', 2, true);
          public          admin_db    false    261            �           0    0    questions_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.questions_id_seq', 13, true);
          public          admin_db    false    263            �           0    0 $   questions_localizations_links_id_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public.questions_localizations_links_id_seq', 10, true);
          public          admin_db    false    265            �           0    0    responses_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.responses_id_seq', 15, true);
          public          admin_db    false    267            �           0    0 $   responses_localizations_links_id_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public.responses_localizations_links_id_seq', 1, false);
          public          admin_db    false    271            �           0    0    responses_question_links_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.responses_question_links_id_seq', 15, true);
          public          admin_db    false    269            �           0    0 #   strapi_api_token_permissions_id_seq    SEQUENCE SET     R   SELECT pg_catalog.setval('public.strapi_api_token_permissions_id_seq', 1, false);
          public          admin_db    false    225            �           0    0 /   strapi_api_token_permissions_token_links_id_seq    SEQUENCE SET     ^   SELECT pg_catalog.setval('public.strapi_api_token_permissions_token_links_id_seq', 1, false);
          public          admin_db    false    247            �           0    0    strapi_api_tokens_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.strapi_api_tokens_id_seq', 1, true);
          public          admin_db    false    223            �           0    0 !   strapi_core_store_settings_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.strapi_core_store_settings_id_seq', 26, true);
          public          admin_db    false    213            �           0    0    strapi_database_schema_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.strapi_database_schema_id_seq', 9, true);
          public          admin_db    false    211            �           0    0    strapi_migrations_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.strapi_migrations_id_seq', 1, false);
          public          admin_db    false    209                        0    0 (   strapi_transfer_token_permissions_id_seq    SEQUENCE SET     W   SELECT pg_catalog.setval('public.strapi_transfer_token_permissions_id_seq', 1, false);
          public          admin_db    false    229                       0    0 4   strapi_transfer_token_permissions_token_links_id_seq    SEQUENCE SET     c   SELECT pg_catalog.setval('public.strapi_transfer_token_permissions_token_links_id_seq', 1, false);
          public          admin_db    false    249                       0    0    strapi_transfer_tokens_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.strapi_transfer_tokens_id_seq', 1, false);
          public          admin_db    false    227                       0    0    strapi_webhooks_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.strapi_webhooks_id_seq', 1, false);
          public          admin_db    false    215                       0    0    up_permissions_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.up_permissions_id_seq', 9, true);
          public          admin_db    false    235                       0    0     up_permissions_role_links_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.up_permissions_role_links_id_seq', 9, true);
          public          admin_db    false    257                       0    0    up_roles_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.up_roles_id_seq', 2, true);
          public          admin_db    false    237                       0    0    up_users_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.up_users_id_seq', 1, false);
          public          admin_db    false    239                       0    0    up_users_role_links_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.up_users_role_links_id_seq', 1, false);
          public          admin_db    false    259            	           0    0    upload_folders_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.upload_folders_id_seq', 1, false);
          public          admin_db    false    233            
           0    0 "   upload_folders_parent_links_id_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.upload_folders_parent_links_id_seq', 1, false);
          public          admin_db    false    255            (           2606    16618 (   admin_permissions admin_permissions_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.admin_permissions
    ADD CONSTRAINT admin_permissions_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.admin_permissions DROP CONSTRAINT admin_permissions_pkey;
       public            admin_db    false    218            h           2606    16763 >   admin_permissions_role_links admin_permissions_role_links_pkey 
   CONSTRAINT     |   ALTER TABLE ONLY public.admin_permissions_role_links
    ADD CONSTRAINT admin_permissions_role_links_pkey PRIMARY KEY (id);
 h   ALTER TABLE ONLY public.admin_permissions_role_links DROP CONSTRAINT admin_permissions_role_links_pkey;
       public            admin_db    false    244            j           2606    16767 @   admin_permissions_role_links admin_permissions_role_links_unique 
   CONSTRAINT     �   ALTER TABLE ONLY public.admin_permissions_role_links
    ADD CONSTRAINT admin_permissions_role_links_unique UNIQUE (permission_id, role_id);
 j   ALTER TABLE ONLY public.admin_permissions_role_links DROP CONSTRAINT admin_permissions_role_links_unique;
       public            admin_db    false    244    244            0           2606    16640    admin_roles admin_roles_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.admin_roles
    ADD CONSTRAINT admin_roles_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.admin_roles DROP CONSTRAINT admin_roles_pkey;
       public            admin_db    false    222            ,           2606    16629    admin_users admin_users_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.admin_users
    ADD CONSTRAINT admin_users_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.admin_users DROP CONSTRAINT admin_users_pkey;
       public            admin_db    false    220            p           2606    16775 4   admin_users_roles_links admin_users_roles_links_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public.admin_users_roles_links
    ADD CONSTRAINT admin_users_roles_links_pkey PRIMARY KEY (id);
 ^   ALTER TABLE ONLY public.admin_users_roles_links DROP CONSTRAINT admin_users_roles_links_pkey;
       public            admin_db    false    246            r           2606    16779 6   admin_users_roles_links admin_users_roles_links_unique 
   CONSTRAINT     }   ALTER TABLE ONLY public.admin_users_roles_links
    ADD CONSTRAINT admin_users_roles_links_unique UNIQUE (user_id, role_id);
 `   ALTER TABLE ONLY public.admin_users_roles_links DROP CONSTRAINT admin_users_roles_links_unique;
       public            admin_db    false    246    246            �           2606    16824 *   files_folder_links files_folder_links_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.files_folder_links
    ADD CONSTRAINT files_folder_links_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.files_folder_links DROP CONSTRAINT files_folder_links_pkey;
       public            admin_db    false    254            �           2606    16828 ,   files_folder_links files_folder_links_unique 
   CONSTRAINT     u   ALTER TABLE ONLY public.files_folder_links
    ADD CONSTRAINT files_folder_links_unique UNIQUE (file_id, folder_id);
 V   ALTER TABLE ONLY public.files_folder_links DROP CONSTRAINT files_folder_links_unique;
       public            admin_db    false    254    254            D           2606    16691    files files_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.files
    ADD CONSTRAINT files_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.files DROP CONSTRAINT files_pkey;
       public            admin_db    false    232            �           2606    16814 .   files_related_morphs files_related_morphs_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public.files_related_morphs
    ADD CONSTRAINT files_related_morphs_pkey PRIMARY KEY (id);
 X   ALTER TABLE ONLY public.files_related_morphs DROP CONSTRAINT files_related_morphs_pkey;
       public            admin_db    false    252            b           2606    16754    i18n_locale i18n_locale_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.i18n_locale
    ADD CONSTRAINT i18n_locale_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.i18n_locale DROP CONSTRAINT i18n_locale_pkey;
       public            admin_db    false    242            �           2606    17122    languages languages_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.languages DROP CONSTRAINT languages_pkey;
       public            admin_db    false    262            �           2606    17154 @   questions_localizations_links questions_localizations_links_pkey 
   CONSTRAINT     ~   ALTER TABLE ONLY public.questions_localizations_links
    ADD CONSTRAINT questions_localizations_links_pkey PRIMARY KEY (id);
 j   ALTER TABLE ONLY public.questions_localizations_links DROP CONSTRAINT questions_localizations_links_pkey;
       public            admin_db    false    266            �           2606    17158 B   questions_localizations_links questions_localizations_links_unique 
   CONSTRAINT     �   ALTER TABLE ONLY public.questions_localizations_links
    ADD CONSTRAINT questions_localizations_links_unique UNIQUE (question_id, inv_question_id);
 l   ALTER TABLE ONLY public.questions_localizations_links DROP CONSTRAINT questions_localizations_links_unique;
       public            admin_db    false    266    266            �           2606    17145    questions questions_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.questions DROP CONSTRAINT questions_pkey;
       public            admin_db    false    264            �           2606    17226 @   responses_localizations_links responses_localizations_links_pkey 
   CONSTRAINT     ~   ALTER TABLE ONLY public.responses_localizations_links
    ADD CONSTRAINT responses_localizations_links_pkey PRIMARY KEY (id);
 j   ALTER TABLE ONLY public.responses_localizations_links DROP CONSTRAINT responses_localizations_links_pkey;
       public            admin_db    false    272            �           2606    17230 B   responses_localizations_links responses_localizations_links_unique 
   CONSTRAINT     �   ALTER TABLE ONLY public.responses_localizations_links
    ADD CONSTRAINT responses_localizations_links_unique UNIQUE (response_id, inv_response_id);
 l   ALTER TABLE ONLY public.responses_localizations_links DROP CONSTRAINT responses_localizations_links_unique;
       public            admin_db    false    272    272            �           2606    17205    responses responses_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.responses
    ADD CONSTRAINT responses_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.responses DROP CONSTRAINT responses_pkey;
       public            admin_db    false    268            �           2606    17214 6   responses_question_links responses_question_links_pkey 
   CONSTRAINT     t   ALTER TABLE ONLY public.responses_question_links
    ADD CONSTRAINT responses_question_links_pkey PRIMARY KEY (id);
 `   ALTER TABLE ONLY public.responses_question_links DROP CONSTRAINT responses_question_links_pkey;
       public            admin_db    false    270            �           2606    17218 8   responses_question_links responses_question_links_unique 
   CONSTRAINT     �   ALTER TABLE ONLY public.responses_question_links
    ADD CONSTRAINT responses_question_links_unique UNIQUE (response_id, question_id);
 b   ALTER TABLE ONLY public.responses_question_links DROP CONSTRAINT responses_question_links_unique;
       public            admin_db    false    270    270            8           2606    16660 >   strapi_api_token_permissions strapi_api_token_permissions_pkey 
   CONSTRAINT     |   ALTER TABLE ONLY public.strapi_api_token_permissions
    ADD CONSTRAINT strapi_api_token_permissions_pkey PRIMARY KEY (id);
 h   ALTER TABLE ONLY public.strapi_api_token_permissions DROP CONSTRAINT strapi_api_token_permissions_pkey;
       public            admin_db    false    226            w           2606    16788 V   strapi_api_token_permissions_token_links strapi_api_token_permissions_token_links_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.strapi_api_token_permissions_token_links
    ADD CONSTRAINT strapi_api_token_permissions_token_links_pkey PRIMARY KEY (id);
 �   ALTER TABLE ONLY public.strapi_api_token_permissions_token_links DROP CONSTRAINT strapi_api_token_permissions_token_links_pkey;
       public            admin_db    false    248            y           2606    16792 X   strapi_api_token_permissions_token_links strapi_api_token_permissions_token_links_unique 
   CONSTRAINT     �   ALTER TABLE ONLY public.strapi_api_token_permissions_token_links
    ADD CONSTRAINT strapi_api_token_permissions_token_links_unique UNIQUE (api_token_permission_id, api_token_id);
 �   ALTER TABLE ONLY public.strapi_api_token_permissions_token_links DROP CONSTRAINT strapi_api_token_permissions_token_links_unique;
       public            admin_db    false    248    248            4           2606    16651 (   strapi_api_tokens strapi_api_tokens_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.strapi_api_tokens
    ADD CONSTRAINT strapi_api_tokens_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.strapi_api_tokens DROP CONSTRAINT strapi_api_tokens_pkey;
       public            admin_db    false    224            #           2606    16600 :   strapi_core_store_settings strapi_core_store_settings_pkey 
   CONSTRAINT     x   ALTER TABLE ONLY public.strapi_core_store_settings
    ADD CONSTRAINT strapi_core_store_settings_pkey PRIMARY KEY (id);
 d   ALTER TABLE ONLY public.strapi_core_store_settings DROP CONSTRAINT strapi_core_store_settings_pkey;
       public            admin_db    false    214            !           2606    16591 2   strapi_database_schema strapi_database_schema_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.strapi_database_schema
    ADD CONSTRAINT strapi_database_schema_pkey PRIMARY KEY (id);
 \   ALTER TABLE ONLY public.strapi_database_schema DROP CONSTRAINT strapi_database_schema_pkey;
       public            admin_db    false    212                       2606    16582 (   strapi_migrations strapi_migrations_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.strapi_migrations
    ADD CONSTRAINT strapi_migrations_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.strapi_migrations DROP CONSTRAINT strapi_migrations_pkey;
       public            admin_db    false    210            @           2606    16680 H   strapi_transfer_token_permissions strapi_transfer_token_permissions_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.strapi_transfer_token_permissions
    ADD CONSTRAINT strapi_transfer_token_permissions_pkey PRIMARY KEY (id);
 r   ALTER TABLE ONLY public.strapi_transfer_token_permissions DROP CONSTRAINT strapi_transfer_token_permissions_pkey;
       public            admin_db    false    230            ~           2606    16800 `   strapi_transfer_token_permissions_token_links strapi_transfer_token_permissions_token_links_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.strapi_transfer_token_permissions_token_links
    ADD CONSTRAINT strapi_transfer_token_permissions_token_links_pkey PRIMARY KEY (id);
 �   ALTER TABLE ONLY public.strapi_transfer_token_permissions_token_links DROP CONSTRAINT strapi_transfer_token_permissions_token_links_pkey;
       public            admin_db    false    250            �           2606    16804 b   strapi_transfer_token_permissions_token_links strapi_transfer_token_permissions_token_links_unique 
   CONSTRAINT     �   ALTER TABLE ONLY public.strapi_transfer_token_permissions_token_links
    ADD CONSTRAINT strapi_transfer_token_permissions_token_links_unique UNIQUE (transfer_token_permission_id, transfer_token_id);
 �   ALTER TABLE ONLY public.strapi_transfer_token_permissions_token_links DROP CONSTRAINT strapi_transfer_token_permissions_token_links_unique;
       public            admin_db    false    250    250            <           2606    16671 2   strapi_transfer_tokens strapi_transfer_tokens_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.strapi_transfer_tokens
    ADD CONSTRAINT strapi_transfer_tokens_pkey PRIMARY KEY (id);
 \   ALTER TABLE ONLY public.strapi_transfer_tokens DROP CONSTRAINT strapi_transfer_tokens_pkey;
       public            admin_db    false    228            %           2606    16609 $   strapi_webhooks strapi_webhooks_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.strapi_webhooks
    ADD CONSTRAINT strapi_webhooks_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.strapi_webhooks DROP CONSTRAINT strapi_webhooks_pkey;
       public            admin_db    false    216            V           2606    16721 "   up_permissions up_permissions_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.up_permissions
    ADD CONSTRAINT up_permissions_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.up_permissions DROP CONSTRAINT up_permissions_pkey;
       public            admin_db    false    236            �           2606    16848 8   up_permissions_role_links up_permissions_role_links_pkey 
   CONSTRAINT     v   ALTER TABLE ONLY public.up_permissions_role_links
    ADD CONSTRAINT up_permissions_role_links_pkey PRIMARY KEY (id);
 b   ALTER TABLE ONLY public.up_permissions_role_links DROP CONSTRAINT up_permissions_role_links_pkey;
       public            admin_db    false    258            �           2606    16852 :   up_permissions_role_links up_permissions_role_links_unique 
   CONSTRAINT     �   ALTER TABLE ONLY public.up_permissions_role_links
    ADD CONSTRAINT up_permissions_role_links_unique UNIQUE (permission_id, role_id);
 d   ALTER TABLE ONLY public.up_permissions_role_links DROP CONSTRAINT up_permissions_role_links_unique;
       public            admin_db    false    258    258            Z           2606    16732    up_roles up_roles_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.up_roles
    ADD CONSTRAINT up_roles_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.up_roles DROP CONSTRAINT up_roles_pkey;
       public            admin_db    false    238            ^           2606    16743    up_users up_users_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.up_users
    ADD CONSTRAINT up_users_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.up_users DROP CONSTRAINT up_users_pkey;
       public            admin_db    false    240            �           2606    16860 ,   up_users_role_links up_users_role_links_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.up_users_role_links
    ADD CONSTRAINT up_users_role_links_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.up_users_role_links DROP CONSTRAINT up_users_role_links_pkey;
       public            admin_db    false    260            �           2606    16864 .   up_users_role_links up_users_role_links_unique 
   CONSTRAINT     u   ALTER TABLE ONLY public.up_users_role_links
    ADD CONSTRAINT up_users_role_links_unique UNIQUE (user_id, role_id);
 X   ALTER TABLE ONLY public.up_users_role_links DROP CONSTRAINT up_users_role_links_unique;
       public            admin_db    false    260    260            �           2606    16836 <   upload_folders_parent_links upload_folders_parent_links_pkey 
   CONSTRAINT     z   ALTER TABLE ONLY public.upload_folders_parent_links
    ADD CONSTRAINT upload_folders_parent_links_pkey PRIMARY KEY (id);
 f   ALTER TABLE ONLY public.upload_folders_parent_links DROP CONSTRAINT upload_folders_parent_links_pkey;
       public            admin_db    false    256            �           2606    16840 >   upload_folders_parent_links upload_folders_parent_links_unique 
   CONSTRAINT     �   ALTER TABLE ONLY public.upload_folders_parent_links
    ADD CONSTRAINT upload_folders_parent_links_unique UNIQUE (folder_id, inv_folder_id);
 h   ALTER TABLE ONLY public.upload_folders_parent_links DROP CONSTRAINT upload_folders_parent_links_unique;
       public            admin_db    false    256    256            N           2606    16710 +   upload_folders upload_folders_path_id_index 
   CONSTRAINT     i   ALTER TABLE ONLY public.upload_folders
    ADD CONSTRAINT upload_folders_path_id_index UNIQUE (path_id);
 U   ALTER TABLE ONLY public.upload_folders DROP CONSTRAINT upload_folders_path_id_index;
       public            admin_db    false    234            P           2606    16712 (   upload_folders upload_folders_path_index 
   CONSTRAINT     c   ALTER TABLE ONLY public.upload_folders
    ADD CONSTRAINT upload_folders_path_index UNIQUE (path);
 R   ALTER TABLE ONLY public.upload_folders DROP CONSTRAINT upload_folders_path_index;
       public            admin_db    false    234            R           2606    16708 "   upload_folders upload_folders_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.upload_folders
    ADD CONSTRAINT upload_folders_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.upload_folders DROP CONSTRAINT upload_folders_pkey;
       public            admin_db    false    234            &           1259    16619 "   admin_permissions_created_by_id_fk    INDEX     i   CREATE INDEX admin_permissions_created_by_id_fk ON public.admin_permissions USING btree (created_by_id);
 6   DROP INDEX public.admin_permissions_created_by_id_fk;
       public            admin_db    false    218            d           1259    16764    admin_permissions_role_links_fk    INDEX     q   CREATE INDEX admin_permissions_role_links_fk ON public.admin_permissions_role_links USING btree (permission_id);
 3   DROP INDEX public.admin_permissions_role_links_fk;
       public            admin_db    false    244            e           1259    16765 #   admin_permissions_role_links_inv_fk    INDEX     o   CREATE INDEX admin_permissions_role_links_inv_fk ON public.admin_permissions_role_links USING btree (role_id);
 7   DROP INDEX public.admin_permissions_role_links_inv_fk;
       public            admin_db    false    244            f           1259    16768 )   admin_permissions_role_links_order_inv_fk    INDEX     ~   CREATE INDEX admin_permissions_role_links_order_inv_fk ON public.admin_permissions_role_links USING btree (permission_order);
 =   DROP INDEX public.admin_permissions_role_links_order_inv_fk;
       public            admin_db    false    244            )           1259    16620 "   admin_permissions_updated_by_id_fk    INDEX     i   CREATE INDEX admin_permissions_updated_by_id_fk ON public.admin_permissions USING btree (updated_by_id);
 6   DROP INDEX public.admin_permissions_updated_by_id_fk;
       public            admin_db    false    218            .           1259    16641    admin_roles_created_by_id_fk    INDEX     ]   CREATE INDEX admin_roles_created_by_id_fk ON public.admin_roles USING btree (created_by_id);
 0   DROP INDEX public.admin_roles_created_by_id_fk;
       public            admin_db    false    222            1           1259    16642    admin_roles_updated_by_id_fk    INDEX     ]   CREATE INDEX admin_roles_updated_by_id_fk ON public.admin_roles USING btree (updated_by_id);
 0   DROP INDEX public.admin_roles_updated_by_id_fk;
       public            admin_db    false    222            *           1259    16630    admin_users_created_by_id_fk    INDEX     ]   CREATE INDEX admin_users_created_by_id_fk ON public.admin_users USING btree (created_by_id);
 0   DROP INDEX public.admin_users_created_by_id_fk;
       public            admin_db    false    220            k           1259    16776    admin_users_roles_links_fk    INDEX     a   CREATE INDEX admin_users_roles_links_fk ON public.admin_users_roles_links USING btree (user_id);
 .   DROP INDEX public.admin_users_roles_links_fk;
       public            admin_db    false    246            l           1259    16777    admin_users_roles_links_inv_fk    INDEX     e   CREATE INDEX admin_users_roles_links_inv_fk ON public.admin_users_roles_links USING btree (role_id);
 2   DROP INDEX public.admin_users_roles_links_inv_fk;
       public            admin_db    false    246            m           1259    16780     admin_users_roles_links_order_fk    INDEX     j   CREATE INDEX admin_users_roles_links_order_fk ON public.admin_users_roles_links USING btree (role_order);
 4   DROP INDEX public.admin_users_roles_links_order_fk;
       public            admin_db    false    246            n           1259    16781 $   admin_users_roles_links_order_inv_fk    INDEX     n   CREATE INDEX admin_users_roles_links_order_inv_fk ON public.admin_users_roles_links USING btree (user_order);
 8   DROP INDEX public.admin_users_roles_links_order_inv_fk;
       public            admin_db    false    246            -           1259    16631    admin_users_updated_by_id_fk    INDEX     ]   CREATE INDEX admin_users_updated_by_id_fk ON public.admin_users USING btree (updated_by_id);
 0   DROP INDEX public.admin_users_updated_by_id_fk;
       public            admin_db    false    220            B           1259    16698    files_created_by_id_fk    INDEX     Q   CREATE INDEX files_created_by_id_fk ON public.files USING btree (created_by_id);
 *   DROP INDEX public.files_created_by_id_fk;
       public            admin_db    false    232            �           1259    16825    files_folder_links_fk    INDEX     W   CREATE INDEX files_folder_links_fk ON public.files_folder_links USING btree (file_id);
 )   DROP INDEX public.files_folder_links_fk;
       public            admin_db    false    254            �           1259    16826    files_folder_links_inv_fk    INDEX     ]   CREATE INDEX files_folder_links_inv_fk ON public.files_folder_links USING btree (folder_id);
 -   DROP INDEX public.files_folder_links_inv_fk;
       public            admin_db    false    254            �           1259    16829    files_folder_links_order_inv_fk    INDEX     d   CREATE INDEX files_folder_links_order_inv_fk ON public.files_folder_links USING btree (file_order);
 3   DROP INDEX public.files_folder_links_order_inv_fk;
       public            admin_db    false    254            �           1259    16815    files_related_morphs_fk    INDEX     [   CREATE INDEX files_related_morphs_fk ON public.files_related_morphs USING btree (file_id);
 +   DROP INDEX public.files_related_morphs_fk;
       public            admin_db    false    252            �           1259    16817 $   files_related_morphs_id_column_index    INDEX     k   CREATE INDEX files_related_morphs_id_column_index ON public.files_related_morphs USING btree (related_id);
 8   DROP INDEX public.files_related_morphs_id_column_index;
       public            admin_db    false    252            �           1259    16816     files_related_morphs_order_index    INDEX     d   CREATE INDEX files_related_morphs_order_index ON public.files_related_morphs USING btree ("order");
 4   DROP INDEX public.files_related_morphs_order_index;
       public            admin_db    false    252            E           1259    16699    files_updated_by_id_fk    INDEX     Q   CREATE INDEX files_updated_by_id_fk ON public.files USING btree (updated_by_id);
 *   DROP INDEX public.files_updated_by_id_fk;
       public            admin_db    false    232            `           1259    16755    i18n_locale_created_by_id_fk    INDEX     ]   CREATE INDEX i18n_locale_created_by_id_fk ON public.i18n_locale USING btree (created_by_id);
 0   DROP INDEX public.i18n_locale_created_by_id_fk;
       public            admin_db    false    242            c           1259    16756    i18n_locale_updated_by_id_fk    INDEX     ]   CREATE INDEX i18n_locale_updated_by_id_fk ON public.i18n_locale USING btree (updated_by_id);
 0   DROP INDEX public.i18n_locale_updated_by_id_fk;
       public            admin_db    false    242            �           1259    17123    languages_created_by_id_fk    INDEX     Y   CREATE INDEX languages_created_by_id_fk ON public.languages USING btree (created_by_id);
 .   DROP INDEX public.languages_created_by_id_fk;
       public            admin_db    false    262            �           1259    17124    languages_updated_by_id_fk    INDEX     Y   CREATE INDEX languages_updated_by_id_fk ON public.languages USING btree (updated_by_id);
 .   DROP INDEX public.languages_updated_by_id_fk;
       public            admin_db    false    262            �           1259    17146    questions_created_by_id_fk    INDEX     Y   CREATE INDEX questions_created_by_id_fk ON public.questions USING btree (created_by_id);
 .   DROP INDEX public.questions_created_by_id_fk;
       public            admin_db    false    264            �           1259    17155     questions_localizations_links_fk    INDEX     q   CREATE INDEX questions_localizations_links_fk ON public.questions_localizations_links USING btree (question_id);
 4   DROP INDEX public.questions_localizations_links_fk;
       public            admin_db    false    266            �           1259    17156 $   questions_localizations_links_inv_fk    INDEX     y   CREATE INDEX questions_localizations_links_inv_fk ON public.questions_localizations_links USING btree (inv_question_id);
 8   DROP INDEX public.questions_localizations_links_inv_fk;
       public            admin_db    false    266            �           1259    17159 &   questions_localizations_links_order_fk    INDEX     z   CREATE INDEX questions_localizations_links_order_fk ON public.questions_localizations_links USING btree (question_order);
 :   DROP INDEX public.questions_localizations_links_order_fk;
       public            admin_db    false    266            �           1259    17147    questions_updated_by_id_fk    INDEX     Y   CREATE INDEX questions_updated_by_id_fk ON public.questions USING btree (updated_by_id);
 .   DROP INDEX public.questions_updated_by_id_fk;
       public            admin_db    false    264            �           1259    17206    responses_created_by_id_fk    INDEX     Y   CREATE INDEX responses_created_by_id_fk ON public.responses USING btree (created_by_id);
 .   DROP INDEX public.responses_created_by_id_fk;
       public            admin_db    false    268            �           1259    17227     responses_localizations_links_fk    INDEX     q   CREATE INDEX responses_localizations_links_fk ON public.responses_localizations_links USING btree (response_id);
 4   DROP INDEX public.responses_localizations_links_fk;
       public            admin_db    false    272            �           1259    17228 $   responses_localizations_links_inv_fk    INDEX     y   CREATE INDEX responses_localizations_links_inv_fk ON public.responses_localizations_links USING btree (inv_response_id);
 8   DROP INDEX public.responses_localizations_links_inv_fk;
       public            admin_db    false    272            �           1259    17231 &   responses_localizations_links_order_fk    INDEX     z   CREATE INDEX responses_localizations_links_order_fk ON public.responses_localizations_links USING btree (response_order);
 :   DROP INDEX public.responses_localizations_links_order_fk;
       public            admin_db    false    272            �           1259    17215    responses_question_links_fk    INDEX     g   CREATE INDEX responses_question_links_fk ON public.responses_question_links USING btree (response_id);
 /   DROP INDEX public.responses_question_links_fk;
       public            admin_db    false    270            �           1259    17216    responses_question_links_inv_fk    INDEX     k   CREATE INDEX responses_question_links_inv_fk ON public.responses_question_links USING btree (question_id);
 3   DROP INDEX public.responses_question_links_inv_fk;
       public            admin_db    false    270            �           1259    17219 %   responses_question_links_order_inv_fk    INDEX     t   CREATE INDEX responses_question_links_order_inv_fk ON public.responses_question_links USING btree (response_order);
 9   DROP INDEX public.responses_question_links_order_inv_fk;
       public            admin_db    false    270            �           1259    17207    responses_updated_by_id_fk    INDEX     Y   CREATE INDEX responses_updated_by_id_fk ON public.responses USING btree (updated_by_id);
 .   DROP INDEX public.responses_updated_by_id_fk;
       public            admin_db    false    268            6           1259    16661 -   strapi_api_token_permissions_created_by_id_fk    INDEX        CREATE INDEX strapi_api_token_permissions_created_by_id_fk ON public.strapi_api_token_permissions USING btree (created_by_id);
 A   DROP INDEX public.strapi_api_token_permissions_created_by_id_fk;
       public            admin_db    false    226            s           1259    16789 +   strapi_api_token_permissions_token_links_fk    INDEX     �   CREATE INDEX strapi_api_token_permissions_token_links_fk ON public.strapi_api_token_permissions_token_links USING btree (api_token_permission_id);
 ?   DROP INDEX public.strapi_api_token_permissions_token_links_fk;
       public            admin_db    false    248            t           1259    16790 /   strapi_api_token_permissions_token_links_inv_fk    INDEX     �   CREATE INDEX strapi_api_token_permissions_token_links_inv_fk ON public.strapi_api_token_permissions_token_links USING btree (api_token_id);
 C   DROP INDEX public.strapi_api_token_permissions_token_links_inv_fk;
       public            admin_db    false    248            u           1259    16793 5   strapi_api_token_permissions_token_links_order_inv_fk    INDEX     �   CREATE INDEX strapi_api_token_permissions_token_links_order_inv_fk ON public.strapi_api_token_permissions_token_links USING btree (api_token_permission_order);
 I   DROP INDEX public.strapi_api_token_permissions_token_links_order_inv_fk;
       public            admin_db    false    248            9           1259    16662 -   strapi_api_token_permissions_updated_by_id_fk    INDEX        CREATE INDEX strapi_api_token_permissions_updated_by_id_fk ON public.strapi_api_token_permissions USING btree (updated_by_id);
 A   DROP INDEX public.strapi_api_token_permissions_updated_by_id_fk;
       public            admin_db    false    226            2           1259    16652 "   strapi_api_tokens_created_by_id_fk    INDEX     i   CREATE INDEX strapi_api_tokens_created_by_id_fk ON public.strapi_api_tokens USING btree (created_by_id);
 6   DROP INDEX public.strapi_api_tokens_created_by_id_fk;
       public            admin_db    false    224            5           1259    16653 "   strapi_api_tokens_updated_by_id_fk    INDEX     i   CREATE INDEX strapi_api_tokens_updated_by_id_fk ON public.strapi_api_tokens USING btree (updated_by_id);
 6   DROP INDEX public.strapi_api_tokens_updated_by_id_fk;
       public            admin_db    false    224            >           1259    16681 2   strapi_transfer_token_permissions_created_by_id_fk    INDEX     �   CREATE INDEX strapi_transfer_token_permissions_created_by_id_fk ON public.strapi_transfer_token_permissions USING btree (created_by_id);
 F   DROP INDEX public.strapi_transfer_token_permissions_created_by_id_fk;
       public            admin_db    false    230            z           1259    16801 0   strapi_transfer_token_permissions_token_links_fk    INDEX     �   CREATE INDEX strapi_transfer_token_permissions_token_links_fk ON public.strapi_transfer_token_permissions_token_links USING btree (transfer_token_permission_id);
 D   DROP INDEX public.strapi_transfer_token_permissions_token_links_fk;
       public            admin_db    false    250            {           1259    16802 4   strapi_transfer_token_permissions_token_links_inv_fk    INDEX     �   CREATE INDEX strapi_transfer_token_permissions_token_links_inv_fk ON public.strapi_transfer_token_permissions_token_links USING btree (transfer_token_id);
 H   DROP INDEX public.strapi_transfer_token_permissions_token_links_inv_fk;
       public            admin_db    false    250            |           1259    16805 :   strapi_transfer_token_permissions_token_links_order_inv_fk    INDEX     �   CREATE INDEX strapi_transfer_token_permissions_token_links_order_inv_fk ON public.strapi_transfer_token_permissions_token_links USING btree (transfer_token_permission_order);
 N   DROP INDEX public.strapi_transfer_token_permissions_token_links_order_inv_fk;
       public            admin_db    false    250            A           1259    16682 2   strapi_transfer_token_permissions_updated_by_id_fk    INDEX     �   CREATE INDEX strapi_transfer_token_permissions_updated_by_id_fk ON public.strapi_transfer_token_permissions USING btree (updated_by_id);
 F   DROP INDEX public.strapi_transfer_token_permissions_updated_by_id_fk;
       public            admin_db    false    230            :           1259    16672 '   strapi_transfer_tokens_created_by_id_fk    INDEX     s   CREATE INDEX strapi_transfer_tokens_created_by_id_fk ON public.strapi_transfer_tokens USING btree (created_by_id);
 ;   DROP INDEX public.strapi_transfer_tokens_created_by_id_fk;
       public            admin_db    false    228            =           1259    16673 '   strapi_transfer_tokens_updated_by_id_fk    INDEX     s   CREATE INDEX strapi_transfer_tokens_updated_by_id_fk ON public.strapi_transfer_tokens USING btree (updated_by_id);
 ;   DROP INDEX public.strapi_transfer_tokens_updated_by_id_fk;
       public            admin_db    false    228            T           1259    16722    up_permissions_created_by_id_fk    INDEX     c   CREATE INDEX up_permissions_created_by_id_fk ON public.up_permissions USING btree (created_by_id);
 3   DROP INDEX public.up_permissions_created_by_id_fk;
       public            admin_db    false    236            �           1259    16849    up_permissions_role_links_fk    INDEX     k   CREATE INDEX up_permissions_role_links_fk ON public.up_permissions_role_links USING btree (permission_id);
 0   DROP INDEX public.up_permissions_role_links_fk;
       public            admin_db    false    258            �           1259    16850     up_permissions_role_links_inv_fk    INDEX     i   CREATE INDEX up_permissions_role_links_inv_fk ON public.up_permissions_role_links USING btree (role_id);
 4   DROP INDEX public.up_permissions_role_links_inv_fk;
       public            admin_db    false    258            �           1259    16853 &   up_permissions_role_links_order_inv_fk    INDEX     x   CREATE INDEX up_permissions_role_links_order_inv_fk ON public.up_permissions_role_links USING btree (permission_order);
 :   DROP INDEX public.up_permissions_role_links_order_inv_fk;
       public            admin_db    false    258            W           1259    16723    up_permissions_updated_by_id_fk    INDEX     c   CREATE INDEX up_permissions_updated_by_id_fk ON public.up_permissions USING btree (updated_by_id);
 3   DROP INDEX public.up_permissions_updated_by_id_fk;
       public            admin_db    false    236            X           1259    16733    up_roles_created_by_id_fk    INDEX     W   CREATE INDEX up_roles_created_by_id_fk ON public.up_roles USING btree (created_by_id);
 -   DROP INDEX public.up_roles_created_by_id_fk;
       public            admin_db    false    238            [           1259    16734    up_roles_updated_by_id_fk    INDEX     W   CREATE INDEX up_roles_updated_by_id_fk ON public.up_roles USING btree (updated_by_id);
 -   DROP INDEX public.up_roles_updated_by_id_fk;
       public            admin_db    false    238            \           1259    16744    up_users_created_by_id_fk    INDEX     W   CREATE INDEX up_users_created_by_id_fk ON public.up_users USING btree (created_by_id);
 -   DROP INDEX public.up_users_created_by_id_fk;
       public            admin_db    false    240            �           1259    16861    up_users_role_links_fk    INDEX     Y   CREATE INDEX up_users_role_links_fk ON public.up_users_role_links USING btree (user_id);
 *   DROP INDEX public.up_users_role_links_fk;
       public            admin_db    false    260            �           1259    16862    up_users_role_links_inv_fk    INDEX     ]   CREATE INDEX up_users_role_links_inv_fk ON public.up_users_role_links USING btree (role_id);
 .   DROP INDEX public.up_users_role_links_inv_fk;
       public            admin_db    false    260            �           1259    16865     up_users_role_links_order_inv_fk    INDEX     f   CREATE INDEX up_users_role_links_order_inv_fk ON public.up_users_role_links USING btree (user_order);
 4   DROP INDEX public.up_users_role_links_order_inv_fk;
       public            admin_db    false    260            _           1259    16745    up_users_updated_by_id_fk    INDEX     W   CREATE INDEX up_users_updated_by_id_fk ON public.up_users USING btree (updated_by_id);
 -   DROP INDEX public.up_users_updated_by_id_fk;
       public            admin_db    false    240            F           1259    16693    upload_files_created_at_index    INDEX     U   CREATE INDEX upload_files_created_at_index ON public.files USING btree (created_at);
 1   DROP INDEX public.upload_files_created_at_index;
       public            admin_db    false    232            G           1259    16697    upload_files_ext_index    INDEX     G   CREATE INDEX upload_files_ext_index ON public.files USING btree (ext);
 *   DROP INDEX public.upload_files_ext_index;
       public            admin_db    false    232            H           1259    16692    upload_files_folder_path_index    INDEX     W   CREATE INDEX upload_files_folder_path_index ON public.files USING btree (folder_path);
 2   DROP INDEX public.upload_files_folder_path_index;
       public            admin_db    false    232            I           1259    16695    upload_files_name_index    INDEX     I   CREATE INDEX upload_files_name_index ON public.files USING btree (name);
 +   DROP INDEX public.upload_files_name_index;
       public            admin_db    false    232            J           1259    16696    upload_files_size_index    INDEX     I   CREATE INDEX upload_files_size_index ON public.files USING btree (size);
 +   DROP INDEX public.upload_files_size_index;
       public            admin_db    false    232            K           1259    16694    upload_files_updated_at_index    INDEX     U   CREATE INDEX upload_files_updated_at_index ON public.files USING btree (updated_at);
 1   DROP INDEX public.upload_files_updated_at_index;
       public            admin_db    false    232            L           1259    16713    upload_folders_created_by_id_fk    INDEX     c   CREATE INDEX upload_folders_created_by_id_fk ON public.upload_folders USING btree (created_by_id);
 3   DROP INDEX public.upload_folders_created_by_id_fk;
       public            admin_db    false    234            �           1259    16837    upload_folders_parent_links_fk    INDEX     k   CREATE INDEX upload_folders_parent_links_fk ON public.upload_folders_parent_links USING btree (folder_id);
 2   DROP INDEX public.upload_folders_parent_links_fk;
       public            admin_db    false    256            �           1259    16838 "   upload_folders_parent_links_inv_fk    INDEX     s   CREATE INDEX upload_folders_parent_links_inv_fk ON public.upload_folders_parent_links USING btree (inv_folder_id);
 6   DROP INDEX public.upload_folders_parent_links_inv_fk;
       public            admin_db    false    256            �           1259    16841 (   upload_folders_parent_links_order_inv_fk    INDEX     x   CREATE INDEX upload_folders_parent_links_order_inv_fk ON public.upload_folders_parent_links USING btree (folder_order);
 <   DROP INDEX public.upload_folders_parent_links_order_inv_fk;
       public            admin_db    false    256            S           1259    16714    upload_folders_updated_by_id_fk    INDEX     c   CREATE INDEX upload_folders_updated_by_id_fk ON public.upload_folders USING btree (updated_by_id);
 3   DROP INDEX public.upload_folders_updated_by_id_fk;
       public            admin_db    false    234            �           2606    16866 4   admin_permissions admin_permissions_created_by_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.admin_permissions
    ADD CONSTRAINT admin_permissions_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;
 ^   ALTER TABLE ONLY public.admin_permissions DROP CONSTRAINT admin_permissions_created_by_id_fk;
       public          admin_db    false    3372    220    218            �           2606    16996 <   admin_permissions_role_links admin_permissions_role_links_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.admin_permissions_role_links
    ADD CONSTRAINT admin_permissions_role_links_fk FOREIGN KEY (permission_id) REFERENCES public.admin_permissions(id) ON DELETE CASCADE;
 f   ALTER TABLE ONLY public.admin_permissions_role_links DROP CONSTRAINT admin_permissions_role_links_fk;
       public          admin_db    false    3368    244    218            �           2606    17001 @   admin_permissions_role_links admin_permissions_role_links_inv_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.admin_permissions_role_links
    ADD CONSTRAINT admin_permissions_role_links_inv_fk FOREIGN KEY (role_id) REFERENCES public.admin_roles(id) ON DELETE CASCADE;
 j   ALTER TABLE ONLY public.admin_permissions_role_links DROP CONSTRAINT admin_permissions_role_links_inv_fk;
       public          admin_db    false    3376    222    244            �           2606    16871 4   admin_permissions admin_permissions_updated_by_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.admin_permissions
    ADD CONSTRAINT admin_permissions_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;
 ^   ALTER TABLE ONLY public.admin_permissions DROP CONSTRAINT admin_permissions_updated_by_id_fk;
       public          admin_db    false    218    220    3372            �           2606    16886 (   admin_roles admin_roles_created_by_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.admin_roles
    ADD CONSTRAINT admin_roles_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;
 R   ALTER TABLE ONLY public.admin_roles DROP CONSTRAINT admin_roles_created_by_id_fk;
       public          admin_db    false    222    3372    220            �           2606    16891 (   admin_roles admin_roles_updated_by_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.admin_roles
    ADD CONSTRAINT admin_roles_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;
 R   ALTER TABLE ONLY public.admin_roles DROP CONSTRAINT admin_roles_updated_by_id_fk;
       public          admin_db    false    222    220    3372            �           2606    16876 (   admin_users admin_users_created_by_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.admin_users
    ADD CONSTRAINT admin_users_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;
 R   ALTER TABLE ONLY public.admin_users DROP CONSTRAINT admin_users_created_by_id_fk;
       public          admin_db    false    3372    220    220            �           2606    17006 2   admin_users_roles_links admin_users_roles_links_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.admin_users_roles_links
    ADD CONSTRAINT admin_users_roles_links_fk FOREIGN KEY (user_id) REFERENCES public.admin_users(id) ON DELETE CASCADE;
 \   ALTER TABLE ONLY public.admin_users_roles_links DROP CONSTRAINT admin_users_roles_links_fk;
       public          admin_db    false    3372    220    246            �           2606    17011 6   admin_users_roles_links admin_users_roles_links_inv_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.admin_users_roles_links
    ADD CONSTRAINT admin_users_roles_links_inv_fk FOREIGN KEY (role_id) REFERENCES public.admin_roles(id) ON DELETE CASCADE;
 `   ALTER TABLE ONLY public.admin_users_roles_links DROP CONSTRAINT admin_users_roles_links_inv_fk;
       public          admin_db    false    3376    246    222            �           2606    16881 (   admin_users admin_users_updated_by_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.admin_users
    ADD CONSTRAINT admin_users_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;
 R   ALTER TABLE ONLY public.admin_users DROP CONSTRAINT admin_users_updated_by_id_fk;
       public          admin_db    false    220    220    3372            �           2606    16936    files files_created_by_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.files
    ADD CONSTRAINT files_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;
 F   ALTER TABLE ONLY public.files DROP CONSTRAINT files_created_by_id_fk;
       public          admin_db    false    232    3372    220            �           2606    17041 (   files_folder_links files_folder_links_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.files_folder_links
    ADD CONSTRAINT files_folder_links_fk FOREIGN KEY (file_id) REFERENCES public.files(id) ON DELETE CASCADE;
 R   ALTER TABLE ONLY public.files_folder_links DROP CONSTRAINT files_folder_links_fk;
       public          admin_db    false    254    232    3396            �           2606    17046 ,   files_folder_links files_folder_links_inv_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.files_folder_links
    ADD CONSTRAINT files_folder_links_inv_fk FOREIGN KEY (folder_id) REFERENCES public.upload_folders(id) ON DELETE CASCADE;
 V   ALTER TABLE ONLY public.files_folder_links DROP CONSTRAINT files_folder_links_inv_fk;
       public          admin_db    false    234    254    3410            �           2606    17036 ,   files_related_morphs files_related_morphs_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.files_related_morphs
    ADD CONSTRAINT files_related_morphs_fk FOREIGN KEY (file_id) REFERENCES public.files(id) ON DELETE CASCADE;
 V   ALTER TABLE ONLY public.files_related_morphs DROP CONSTRAINT files_related_morphs_fk;
       public          admin_db    false    252    3396    232            �           2606    16941    files files_updated_by_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.files
    ADD CONSTRAINT files_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;
 F   ALTER TABLE ONLY public.files DROP CONSTRAINT files_updated_by_id_fk;
       public          admin_db    false    220    3372    232            �           2606    16986 (   i18n_locale i18n_locale_created_by_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.i18n_locale
    ADD CONSTRAINT i18n_locale_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;
 R   ALTER TABLE ONLY public.i18n_locale DROP CONSTRAINT i18n_locale_created_by_id_fk;
       public          admin_db    false    242    3372    220            �           2606    16991 (   i18n_locale i18n_locale_updated_by_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.i18n_locale
    ADD CONSTRAINT i18n_locale_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;
 R   ALTER TABLE ONLY public.i18n_locale DROP CONSTRAINT i18n_locale_updated_by_id_fk;
       public          admin_db    false    220    242    3372            �           2606    17125 $   languages languages_created_by_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;
 N   ALTER TABLE ONLY public.languages DROP CONSTRAINT languages_created_by_id_fk;
       public          admin_db    false    220    3372    262            �           2606    17130 $   languages languages_updated_by_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;
 N   ALTER TABLE ONLY public.languages DROP CONSTRAINT languages_updated_by_id_fk;
       public          admin_db    false    220    3372    262            �           2606    17160 $   questions questions_created_by_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;
 N   ALTER TABLE ONLY public.questions DROP CONSTRAINT questions_created_by_id_fk;
       public          admin_db    false    264    220    3372            �           2606    17170 >   questions_localizations_links questions_localizations_links_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.questions_localizations_links
    ADD CONSTRAINT questions_localizations_links_fk FOREIGN KEY (question_id) REFERENCES public.questions(id) ON DELETE CASCADE;
 h   ALTER TABLE ONLY public.questions_localizations_links DROP CONSTRAINT questions_localizations_links_fk;
       public          admin_db    false    3496    266    264            �           2606    17175 B   questions_localizations_links questions_localizations_links_inv_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.questions_localizations_links
    ADD CONSTRAINT questions_localizations_links_inv_fk FOREIGN KEY (inv_question_id) REFERENCES public.questions(id) ON DELETE CASCADE;
 l   ALTER TABLE ONLY public.questions_localizations_links DROP CONSTRAINT questions_localizations_links_inv_fk;
       public          admin_db    false    264    3496    266            �           2606    17165 $   questions questions_updated_by_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;
 N   ALTER TABLE ONLY public.questions DROP CONSTRAINT questions_updated_by_id_fk;
       public          admin_db    false    220    264    3372            �           2606    17232 $   responses responses_created_by_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.responses
    ADD CONSTRAINT responses_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;
 N   ALTER TABLE ONLY public.responses DROP CONSTRAINT responses_created_by_id_fk;
       public          admin_db    false    3372    220    268            �           2606    17252 >   responses_localizations_links responses_localizations_links_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.responses_localizations_links
    ADD CONSTRAINT responses_localizations_links_fk FOREIGN KEY (response_id) REFERENCES public.responses(id) ON DELETE CASCADE;
 h   ALTER TABLE ONLY public.responses_localizations_links DROP CONSTRAINT responses_localizations_links_fk;
       public          admin_db    false    268    3507    272            �           2606    17257 B   responses_localizations_links responses_localizations_links_inv_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.responses_localizations_links
    ADD CONSTRAINT responses_localizations_links_inv_fk FOREIGN KEY (inv_response_id) REFERENCES public.responses(id) ON DELETE CASCADE;
 l   ALTER TABLE ONLY public.responses_localizations_links DROP CONSTRAINT responses_localizations_links_inv_fk;
       public          admin_db    false    3507    272    268            �           2606    17242 4   responses_question_links responses_question_links_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.responses_question_links
    ADD CONSTRAINT responses_question_links_fk FOREIGN KEY (response_id) REFERENCES public.responses(id) ON DELETE CASCADE;
 ^   ALTER TABLE ONLY public.responses_question_links DROP CONSTRAINT responses_question_links_fk;
       public          admin_db    false    3507    270    268            �           2606    17247 8   responses_question_links responses_question_links_inv_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.responses_question_links
    ADD CONSTRAINT responses_question_links_inv_fk FOREIGN KEY (question_id) REFERENCES public.questions(id) ON DELETE CASCADE;
 b   ALTER TABLE ONLY public.responses_question_links DROP CONSTRAINT responses_question_links_inv_fk;
       public          admin_db    false    264    3496    270            �           2606    17237 $   responses responses_updated_by_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.responses
    ADD CONSTRAINT responses_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;
 N   ALTER TABLE ONLY public.responses DROP CONSTRAINT responses_updated_by_id_fk;
       public          admin_db    false    220    3372    268            �           2606    16906 J   strapi_api_token_permissions strapi_api_token_permissions_created_by_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.strapi_api_token_permissions
    ADD CONSTRAINT strapi_api_token_permissions_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;
 t   ALTER TABLE ONLY public.strapi_api_token_permissions DROP CONSTRAINT strapi_api_token_permissions_created_by_id_fk;
       public          admin_db    false    220    226    3372            �           2606    17016 T   strapi_api_token_permissions_token_links strapi_api_token_permissions_token_links_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.strapi_api_token_permissions_token_links
    ADD CONSTRAINT strapi_api_token_permissions_token_links_fk FOREIGN KEY (api_token_permission_id) REFERENCES public.strapi_api_token_permissions(id) ON DELETE CASCADE;
 ~   ALTER TABLE ONLY public.strapi_api_token_permissions_token_links DROP CONSTRAINT strapi_api_token_permissions_token_links_fk;
       public          admin_db    false    226    3384    248            �           2606    17021 X   strapi_api_token_permissions_token_links strapi_api_token_permissions_token_links_inv_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.strapi_api_token_permissions_token_links
    ADD CONSTRAINT strapi_api_token_permissions_token_links_inv_fk FOREIGN KEY (api_token_id) REFERENCES public.strapi_api_tokens(id) ON DELETE CASCADE;
 �   ALTER TABLE ONLY public.strapi_api_token_permissions_token_links DROP CONSTRAINT strapi_api_token_permissions_token_links_inv_fk;
       public          admin_db    false    3380    224    248            �           2606    16911 J   strapi_api_token_permissions strapi_api_token_permissions_updated_by_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.strapi_api_token_permissions
    ADD CONSTRAINT strapi_api_token_permissions_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;
 t   ALTER TABLE ONLY public.strapi_api_token_permissions DROP CONSTRAINT strapi_api_token_permissions_updated_by_id_fk;
       public          admin_db    false    226    220    3372            �           2606    16896 4   strapi_api_tokens strapi_api_tokens_created_by_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.strapi_api_tokens
    ADD CONSTRAINT strapi_api_tokens_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;
 ^   ALTER TABLE ONLY public.strapi_api_tokens DROP CONSTRAINT strapi_api_tokens_created_by_id_fk;
       public          admin_db    false    224    3372    220            �           2606    16901 4   strapi_api_tokens strapi_api_tokens_updated_by_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.strapi_api_tokens
    ADD CONSTRAINT strapi_api_tokens_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;
 ^   ALTER TABLE ONLY public.strapi_api_tokens DROP CONSTRAINT strapi_api_tokens_updated_by_id_fk;
       public          admin_db    false    220    3372    224            �           2606    16926 T   strapi_transfer_token_permissions strapi_transfer_token_permissions_created_by_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.strapi_transfer_token_permissions
    ADD CONSTRAINT strapi_transfer_token_permissions_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;
 ~   ALTER TABLE ONLY public.strapi_transfer_token_permissions DROP CONSTRAINT strapi_transfer_token_permissions_created_by_id_fk;
       public          admin_db    false    3372    220    230            �           2606    17026 ^   strapi_transfer_token_permissions_token_links strapi_transfer_token_permissions_token_links_fk    FK CONSTRAINT        ALTER TABLE ONLY public.strapi_transfer_token_permissions_token_links
    ADD CONSTRAINT strapi_transfer_token_permissions_token_links_fk FOREIGN KEY (transfer_token_permission_id) REFERENCES public.strapi_transfer_token_permissions(id) ON DELETE CASCADE;
 �   ALTER TABLE ONLY public.strapi_transfer_token_permissions_token_links DROP CONSTRAINT strapi_transfer_token_permissions_token_links_fk;
       public          admin_db    false    230    3392    250            �           2606    17031 b   strapi_transfer_token_permissions_token_links strapi_transfer_token_permissions_token_links_inv_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.strapi_transfer_token_permissions_token_links
    ADD CONSTRAINT strapi_transfer_token_permissions_token_links_inv_fk FOREIGN KEY (transfer_token_id) REFERENCES public.strapi_transfer_tokens(id) ON DELETE CASCADE;
 �   ALTER TABLE ONLY public.strapi_transfer_token_permissions_token_links DROP CONSTRAINT strapi_transfer_token_permissions_token_links_inv_fk;
       public          admin_db    false    250    228    3388            �           2606    16931 T   strapi_transfer_token_permissions strapi_transfer_token_permissions_updated_by_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.strapi_transfer_token_permissions
    ADD CONSTRAINT strapi_transfer_token_permissions_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;
 ~   ALTER TABLE ONLY public.strapi_transfer_token_permissions DROP CONSTRAINT strapi_transfer_token_permissions_updated_by_id_fk;
       public          admin_db    false    230    220    3372            �           2606    16916 >   strapi_transfer_tokens strapi_transfer_tokens_created_by_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.strapi_transfer_tokens
    ADD CONSTRAINT strapi_transfer_tokens_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;
 h   ALTER TABLE ONLY public.strapi_transfer_tokens DROP CONSTRAINT strapi_transfer_tokens_created_by_id_fk;
       public          admin_db    false    3372    228    220            �           2606    16921 >   strapi_transfer_tokens strapi_transfer_tokens_updated_by_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.strapi_transfer_tokens
    ADD CONSTRAINT strapi_transfer_tokens_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;
 h   ALTER TABLE ONLY public.strapi_transfer_tokens DROP CONSTRAINT strapi_transfer_tokens_updated_by_id_fk;
       public          admin_db    false    3372    220    228            �           2606    16956 .   up_permissions up_permissions_created_by_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.up_permissions
    ADD CONSTRAINT up_permissions_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;
 X   ALTER TABLE ONLY public.up_permissions DROP CONSTRAINT up_permissions_created_by_id_fk;
       public          admin_db    false    236    3372    220            �           2606    17061 6   up_permissions_role_links up_permissions_role_links_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.up_permissions_role_links
    ADD CONSTRAINT up_permissions_role_links_fk FOREIGN KEY (permission_id) REFERENCES public.up_permissions(id) ON DELETE CASCADE;
 `   ALTER TABLE ONLY public.up_permissions_role_links DROP CONSTRAINT up_permissions_role_links_fk;
       public          admin_db    false    236    3414    258            �           2606    17066 :   up_permissions_role_links up_permissions_role_links_inv_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.up_permissions_role_links
    ADD CONSTRAINT up_permissions_role_links_inv_fk FOREIGN KEY (role_id) REFERENCES public.up_roles(id) ON DELETE CASCADE;
 d   ALTER TABLE ONLY public.up_permissions_role_links DROP CONSTRAINT up_permissions_role_links_inv_fk;
       public          admin_db    false    238    258    3418            �           2606    16961 .   up_permissions up_permissions_updated_by_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.up_permissions
    ADD CONSTRAINT up_permissions_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;
 X   ALTER TABLE ONLY public.up_permissions DROP CONSTRAINT up_permissions_updated_by_id_fk;
       public          admin_db    false    220    236    3372            �           2606    16966 "   up_roles up_roles_created_by_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.up_roles
    ADD CONSTRAINT up_roles_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;
 L   ALTER TABLE ONLY public.up_roles DROP CONSTRAINT up_roles_created_by_id_fk;
       public          admin_db    false    220    3372    238            �           2606    16971 "   up_roles up_roles_updated_by_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.up_roles
    ADD CONSTRAINT up_roles_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;
 L   ALTER TABLE ONLY public.up_roles DROP CONSTRAINT up_roles_updated_by_id_fk;
       public          admin_db    false    3372    220    238            �           2606    16976 "   up_users up_users_created_by_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.up_users
    ADD CONSTRAINT up_users_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;
 L   ALTER TABLE ONLY public.up_users DROP CONSTRAINT up_users_created_by_id_fk;
       public          admin_db    false    3372    240    220            �           2606    17071 *   up_users_role_links up_users_role_links_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.up_users_role_links
    ADD CONSTRAINT up_users_role_links_fk FOREIGN KEY (user_id) REFERENCES public.up_users(id) ON DELETE CASCADE;
 T   ALTER TABLE ONLY public.up_users_role_links DROP CONSTRAINT up_users_role_links_fk;
       public          admin_db    false    3422    240    260            �           2606    17076 .   up_users_role_links up_users_role_links_inv_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.up_users_role_links
    ADD CONSTRAINT up_users_role_links_inv_fk FOREIGN KEY (role_id) REFERENCES public.up_roles(id) ON DELETE CASCADE;
 X   ALTER TABLE ONLY public.up_users_role_links DROP CONSTRAINT up_users_role_links_inv_fk;
       public          admin_db    false    260    238    3418            �           2606    16981 "   up_users up_users_updated_by_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.up_users
    ADD CONSTRAINT up_users_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;
 L   ALTER TABLE ONLY public.up_users DROP CONSTRAINT up_users_updated_by_id_fk;
       public          admin_db    false    3372    240    220            �           2606    16946 .   upload_folders upload_folders_created_by_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.upload_folders
    ADD CONSTRAINT upload_folders_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;
 X   ALTER TABLE ONLY public.upload_folders DROP CONSTRAINT upload_folders_created_by_id_fk;
       public          admin_db    false    3372    234    220            �           2606    17051 :   upload_folders_parent_links upload_folders_parent_links_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.upload_folders_parent_links
    ADD CONSTRAINT upload_folders_parent_links_fk FOREIGN KEY (folder_id) REFERENCES public.upload_folders(id) ON DELETE CASCADE;
 d   ALTER TABLE ONLY public.upload_folders_parent_links DROP CONSTRAINT upload_folders_parent_links_fk;
       public          admin_db    false    256    3410    234            �           2606    17056 >   upload_folders_parent_links upload_folders_parent_links_inv_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.upload_folders_parent_links
    ADD CONSTRAINT upload_folders_parent_links_inv_fk FOREIGN KEY (inv_folder_id) REFERENCES public.upload_folders(id) ON DELETE CASCADE;
 h   ALTER TABLE ONLY public.upload_folders_parent_links DROP CONSTRAINT upload_folders_parent_links_inv_fk;
       public          admin_db    false    3410    256    234            �           2606    16951 .   upload_folders upload_folders_updated_by_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.upload_folders
    ADD CONSTRAINT upload_folders_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;
 X   ALTER TABLE ONLY public.upload_folders DROP CONSTRAINT upload_folders_updated_by_id_fk;
       public          admin_db    false    220    3372    234            �   �  x��Y�r�8];_���@z�5��u� FI3�� N&�5�>�-�6�5���;r\9���ޫW����s�����ۢ{Y���ϫo���<��(!AĂ�����y$�$NA\����dJ�i���y��൒o3� �=��� �!�(a'��`�u�<;�A��� ��}k��s�@�=�b�v�A]5/3���A@\K�uQn�O��'��׀' ~�Io�! �le�d���-{�R�4q�ߖVi�Fࢤ�U�Uf�*>V���Q6c�-��Y���WI���L�s2�~:�o�a��FX!�o�J���?}Yk�)�r�ǧ��U�?��}�J���@�ھ�߽Tc�� �/���>��m1*�)(���X����g��r� ƁP4n�@��/��9
����������9@$��|>��%"W\��_�ƅ ]U�\�`|�䰨E���cMA�M[�r���#ʩ�q��]Q�vm��Sͺxow�j�o�7���BU.x�Uui���������B���P����p@���D��b�@���<иa�e�G�ո��e�G�V5n�o��Q
P'p㖏2ҸQ���-)7���Զ��b��$'9���+�Q�gd	 J�F�D�B���Ƅ�1�ʠ7�.u��dVȬ<ׅ2�ո"W���	���m�����E�T����}�F��j%�Y�o�7�|� j�����q#)�H�k�ld,(fF���t�$j�@�e���c��	����%�k �iw����*�/_���K�
	����y�%��&�T6�)Y����_䨒v��	�;�띔Z�7���m_p�����^�NoSb���9���3<��ո!Ę���ո!N-�>Q��iոa��Y�c�l5n.�sNT`��]�b�9+*�?��g�e�oX8`�9%眈��v�N팞s�b���W㆕���b
�i�;�2W[EW�>ɫ%d���0C��F�j�F�Ynf��������k�gb����usy?�F�r�	�px��d�H�y�qC��N����q��B (�6P���)z�p���j���d.Hs<e���ď�u<e��S���a@�3��\@���ҥe
{G�>p��d�3H����V��@����V���u�<��ϡ�8�{m��᪴�_���z�܍�99MC2�����nt�)?���.�7��;�����7i����߮No�!�zBAܨ�7�N��=��������"��t�����C����p�9������G��$O��N��7��>g����p����xY�:�b��u�(k��ҩ�����a�}�q&dj����2��Nh?�����ܿ���iNqc����sc� �̙�>d���s��;d���_{�wbi<��s��� n�#�����������{:��Y��.�R?������YM�      �   �  x��ɑ!C�R0S�7����H]�*s@</ꍍ�̓�c ���TNJ��h��`tc���&�rp/(B���i��[RmI��C�]pX�pX;pX{�����YPl\=���xT��ˋG�|u��MهG���G-���gp��sqL���p���P3f��P����P;���Pצ��H�ד�W�N0a�I�ff�)��f�i�&g��B�v.Ss0�<�`Z,�&kZl�VcZf!�j_�4-�9HӢ�iZ4�!M�a-�iqY��i�XZ�i�Xڞi�Y�2-K^0-�ըoc2ȠL�b]�i٬�2-��Ц�ek���c�L��b�!��f'ڴ:�B�V���L�d�3�yѦU�ڴNa>��4�=�lkY/��|�ڜ���e��u�|��Z&\��[6\��{t�x����~�������t�=��^��3d{��L��G��}k      �   �   x�u��n� @g���0Q�6[��Y�f��%Fr��H���"W�TK�C�=��%O���>(���oyF-���c��Zb�N��7Bɉ*g��Ν2�lZ�m�z}�~���?���z.�1��Ĵ�P�*���ئ�5z�� ��;fW@���Q��̔V���?j�5j������u��OTq-1��>I�ȭ�{�ʫ��5M�R%~}      �   �   x�3��O����IUpJ,*�����IM��JsS�2�3KR�RK9U�UT��*�3B�s<�2�K#*BJ�R�**|�"rB�
��M��<"�B��*���|�Ҽ*A�Q	g�2202�50�52S04�22�20ֳ04�)������ ��0_      �      x�3�4�@�=... �      �      x������ � �      �      x������ � �      �      x������ � �      �   q   x�3�t�K��,�P�H���L��4202�50�52S04�2��20�340G7�"C=sK�?NC.cN��ļ��3�4Ҋ49ӊ�5[Y�c����r͉���� ��      �   g   x�3�t+J�;�<1��3��������X��T��L��������B��M�����@������!�!��c^z���<�M�@[�c
虘�7� ����� 	M&C      �   v  x�uT˒�0<㯘۞PY/�.�T*UI�!-�[X"�!�w�c��^�B�ӭ��Q����R�E#�ay�fpŊ���^p��]|�'7�������ψC��Y�o�7y�TU�V-s�x_V�*�m�߇e�
;��K�5�FL�2��F)�P���e��?�[�� 8nע�aكr��q��,:O��}ΪJ���ד�"��DL����0-���d\��*g"O�y�y]�~s䪿��7�r�}Ƀ���y�.2���d�k&e���Пજ�v���3��h��[f�>N��#�m���\���ޟO�Gp��D cQB������������}��O�%W�n�r��x�ܡ�_{��6[fI�M�1���d*Q0ᢜ^[s@J��ޑ��5t���� k<BkNC0>��ȚΎ$��n��k�۹�r�h�Y�6�ǉI@'i��ׁ��n Fm���G�����@Z�jk:���F��补�����]��拼?t��wÀt�V9��ĺᴆă�u̟Ti.�p��?��q���GӞ�� �.l�@ߵ�n}]+�[w�WTV>��Y��yJ��	/)��{��y1��苿���8�\���1:FN��s�+�ĭ��,˲��Z��      �   A   x���� ���0&���t�9��u9	A\���;��^�P�'L�B�r´T𛚙�� y.q      �   �  x���;n1�k�)�&ė^�W.l�&��"v��O�2��L �c�ԧ�OJ�x����5P$��zGiAj��(r������D�L���e�3D�|�r�>����rY������.�ߏ�˸�6��d�M��|��V��Íb�*i��+mb��9��JQ`up����u=��}2��@��S��N��x����̖.�_��P̖��Q�9�T�yI��t�5ǕK�	'�X@�ds����n)Pő�����l|o+�n� �=�!PF�#T{���b�k������UlB�����)$W^��H���F�y�o�n�!ؙ�ޕ&y��������r�A_1�E�5�o��7�v{ճK��Hi���m��،/���N��?���      �      x������ � �      �   V   x���	�@ߚbB|��K��#Z,c�	�Ri&�2�V�C�L��mXZf�����M�rJ���M���^�&ZN�C����~��d      �      x������ � �      �      x������ � �      �   �   x�]�Aj1 ��W��H�dK��� PdY�Ғ@�K�@z*�i��2��o߷����>���󧐲,��($���)V��֪��DV��E-��4�1A,|��,]�ꓤ�;�y��+s6��B ���3fZC�ry�����S{A<N����x�v���]�m�~?�7{      �      x��]mo�ȵ���
U@����&�T����6Mr�Eb49���H.I���7���K5�HGNM�6g��Ù3�9�v�����Wi>���y3_Eyt*��"�ZWQ�"��+A=�E�*�g�T���a����u��gc#e<נi����>�/��ut����`2^�Y*�I�*^�OJ�m�/����d�����d���!U$`���mQ5��9^U	�`����(4Q5����$m�O���5�m�E� �e`�YŊ�7� �X�"$Hu\�%�7��,����<��&�S�$I��D�E� �ח����AdIC`�}@�UU�IAm�)�U/�]DY���^8>�T��WJ�"�oU�?M�����A�G+0���u��C\��əUkEb'�q���$��L�XE� Xe�۱"�]�n��Y�	�	F��w�ń����I���9��f�AO�.&��:��?Vr��m�������l�
\�ч��ߣ��1pH�nڸ�e��&�||/�����N�lF{�B�X����0m�M�܄('�T���[5��֋$�liU7.��j��e�״;Rr�/A���B(�z���ݯ��Lca��c�d9F
��B�(Wt�uTU�i���c� ���g�81�M+�H�S'�(�
�o����@�"7R�6PI��Qq��iC�����P?3H�0B&�k:��mQ%V����
�>8+ Y�5-s^\��c�5vk5~oqE�ly	=�0�`���
i}}���iC ��{55�LY�6�p�+�~�eV���:Y�-+d�-���@�"ʯ��ۗѴ<�,����t�eD2�܎�\b�k1�[�U�����6�r�hs�%�d���E��Yq2���'��Sm-(�VK9۠p:�O�q�2=n���^>OkY����֋��ِ��C@���v�bP�w��8�8�^���;�{W����:�l���r+>��6�{�BSaot�8ȼO�� ��ede�6�r��c;@��b�(+wZ���Q��
#^���u��*��+�� e�������2��g�xO�?�k��](55�Q���ŏ
�J�U��|�/�W�ӳ�b�K&�^����I�W��=>~�7��������꣄ø��6�����-%������R��Ou���h���1}9� ���NK�2��H-�M=UΗ�g����*;ٓ������tDUܤ�&�U�6� ���c]�o#�|�sV�j?�af�tY�����"q�k%\��q."\|	�V��%YFf��8��[�cPƞ� �y�`�Jh�����2Uݸy/!^譙w8a+�E��[���&�5W��i�(Pf��<�4z����:�����kt53#�ԥ5ԗ��F�W�����L����?��=�>-z�*�[�5���:�kF4�l�*�\7����j�}�1lb�~/l� �j��+�ʄ�hY�+��:�uR���h�%���z������M�#��ƨe7�uǽ使�X�Z���@ѩ�u�6�;/^� k��X�����4Qu��z�K�WZb�&%ԭp�%����NJ�-r�p�`�����c>�@�FX�oE��+��*����>��8l��u�'��ל���9%��<PQ��ϑ��ʏ�d�j�t\����l9�z�_p���h(K����2�~A���#U�eJp�Hv�I��j�|\��o����"*#��a��҇�:O[��i��w|��/�>m��)��Qq����=���.�i�L^H�uI�t��l�Ȳ3�\�[�Z��t˥�����A����N$�ʴw����$����Λl�[sb����bsP]����mW+�:�P:[W��p`����_�����k���	��u$�}���Un~7�;a�ql0h�O�V!}~V!�7t	��-4��Sec���X`��%kǃ=�v#���uQ���UT�tl�>��4����c��^���R���p`��:
t���h���K�]���.�v�2�m R��g�ǳ2�[���/j+�'��Q��0D;O����D�9ƍƮ;��]�^��):�!�v/9.�i�b�e��$:R�u�+t����D�B�F�+�C#��J�%ݺ���a��>��շs?�9I�����z�M6�J�@j���0�O�p`��i�>�!f�U&V#�v/�!�'{�����y��o�^�B�j�� �Ce�,y�v8�
�3:�#�>��܊д������0���1ݣ�:�|4ͭ#~�zXM��2 XN�7N3�\z#2���j��׆��������\BOZU�/ǝ~�!����4h6��������10}�>�hnw���1���F�S�:��ڴ���ZgBn<a:��tH���̞��0�È7F|ߦ��R���` U���ʬ���"ujE	�x�t��ԘQ5���v�� �l?�P@�<B���������[q����m��qó��s0��W˦C�E�B��ݠE�z�{�uj�U�O���8]E�w�u��^wY��ܾ�Q#Y�Z+�0g�|�s�rM�A�EU.�|ǥN���9���KD�F�at���~5V�D���>A��@��Á�Aʐ���Kqx��̱f̉�K�s����+dSޏ�dt`��h��2�Ӝ�<�}󨱉�~�h+;��T?i�M��%��MfO/	��mӫ�/v�ك����?�K�C���R�l�x�f��\�<V'���3̬��%��ԙ�9�؝���８��$�AR���:�,�$V�T/YJV�Z/�kWt���� �ѹ�:iۄ��fBW/��jYp);�08(��SBt��T�$�T6�,��"�.�"gw�7pc�Ƈō=�'�;9(� �ꢈws~�`�v�l�)*�l�i�@6xto�����{G���ݖm��7X򃁹�fn���x��z��z��lP�|�mA�B	j�N���:����N��q;�d������Bh�\f�1<6��=�v�3�d���p }"�|�!��Á��)�h�����Od��~ή^�:�����ز�bˊ�qRE��,O^�/����y���&Z��؛T�_[�Uu�K����7�6=�d��Xq9�si=�=�f�H��8�aC)8K�����L+lem�4I�o<4�e�hyd2Q��sՂ X�h��[}�\ou�w�[կ�f���|
;&"-�ئ�4�!OICi'�T:z����s0�M8��*�}<{z�tqg}����8��f>��;��3�//���Sbe��ַ���g�x����/i��,��,��h�fҷ\�hj-�r����uS*�� /�E�����&���fg������,	���
��4GP��>�x������N�F��V;#a�2EI��B�KM��]�w19	�a�ٽF���N��
��>����\T���%�^�:� b3��K>���	�	���C���'�1���k	��znw.�1e����k�	d>azq��۟p�
�U靖&�0��ohlTm7g��>B��NKݼ�N��,�i�d�%����w�Ӣ�j-��z A*�J`%���([��~R�eQ��(ˡ�̓e���-��5`��=T
����������#[,=�l�)k�-����ڏ>���=?"�0���taw�G �SQS׳ٶHUG�CZՠi`�b�\g��\�(ҁ�D�g�C�}�o۟� O*�NA�+��Ǌ��mQ5�cm	�*�J=>{��Tz��(&�Iڰ&������m�j(V���L���T!A�v��P���ިF8�Z�$�탐`���{�S{��[ ��|+���Z$vBN	~k���}�*~��U$�U�+&�bMBsYs}�^y+\L�[�ws���A�L�h˻��\\������r�3��2�p$�_դ ���b�u���|�`/r4��,�e�.�:�XHD�18�&V��ɣ��I� �dx"x�������A(E+�!��!0
��1+%��Y�$���A��iB��j4��`�IG�J�F*��&�c�χ�F{�4$̔��T� Ȉ\`j,��:LE�Zq���JӆAʅw����r��D.��G�"@�I�Y/�7���9Ę8N�I�� �  �� �e��6�W�#�&g�=7�f/�M�&���~��S�(��eI��2�z�����Q�&��Ff�,(��1���n�L�Ӗd��l�)����F�������3��9fПz-�f��b��h?�,:���ܓ��y�2)ʗa�X�=���tuX�0�a`����ѡ��a.>N9�wS����N3t�v�fGY,����<�,��k���v�|��mn��`����a�6��uE�+�lM�
tx�tȕ�E2�u�u����2���iQ}ĥ�ɍ=��^�M����+��kHZ�n�WU
ٌ!�^���V)�l���W)����B�	�':�_UQ�@��69�Qo�x@i��7 +ȡ�$�cz�g��@s���5�0*�� Ɔ�GYv��c|��+�8˯h��x,�
q�ÆK��y��;���Eq��e9�[CC�+j�#@\��,;��CͤĶz�f��l��d�R/.a����C?f�*���.M��4O�ۺ.�	e
�=��۴i�b� �� -"�ߠ�Qu���j�J��P/�|�yYx���M���\w��f�n�v��[�6^vm�x�|��XIò4�����`�Y:�`e�8�y�6��9d�9�%��k+.��)ZPEn��חI��6w7�N�b��K�k�.t���F��R��ZzN�����\؀��-���a(�I��:��h��`�h'\�o�\r+���v`�&��rAi-FT��� 	��+P��dTZ{wM���1ԋ�����M�2G4��\�C�B@?�<��J�훩���Z}��c�X�"�@�������ۢ��Q2����/�+Pfw%߿���|�eβ�*�ۍ�1RЌ�06p��{��o���	FK�&�f5#衎��ƿT��t�s��(��,���o�*���!������Ӥ�����4�[�������(�Ƅ�hQdY����Ԩ)F���zfT*���2z�������.��������>Q�>_F�u=E��^�s9
Nk?Y�󾊗 ����쳳8.�y3Ҁ)=���آ�`s^A ��V;��2��ͩ8���5���D���,��G�-P�ᾂӝ�v��TzG Ľ�ëj�$m�=>q��(���$h}`�E' H�����٢lV���q�>kg+3&i�v�\t}cNf�� f���tN�F���@S�1�n�p�ݽ�*����oF���NOG��{:F�ź�'��O4�����''O�s���^�����y,;�u��U4�BS��"-��QN�*��`:�k�K'W-��H{�j��z�m�C}����ۖ�R�߾�k,��0�}b�m�e�B?�a���ɨ��N�2XvX� 47XT���*�\�|��`p�%f��-�#趍�ȅ3���Q\T`�/5͑-GK��<�6Ǻ)�p��v���?�o�����^�X�&e�`5�T0����pM��\ ��f���(����'��v��n�b��$�v��;�2xy� ���p��C���0X�C'�̶���������"=e�>��[�o�n|/x�+>۝���*+ڮ�Ǌ$.�ɋ���<N���P߃�I����O����!�1�>���:�ߜA�����qd�-��� 铩=�/�_6�cĠQ���U��`>ݝJ�(,*�ڂ�G�ib�Q�ὐ�!{qΠJ�>��G�O%��v�R�1,g$�R�gJ&z�ƣ���G��8y���ѣG��9��      �   	  x���s�:����`|LZ^K���p����Qb%ul㏴���W�%ɶ�uI����ݕ���ʖ�ŋ_F�V6�忿���4��G1׮�� L~�0$�60fq,����636�"�:�샵kG{�"�X�V��%�;k�ƒ��Mz>�#��X�~�g��Th��o*����k,�ȶg��_�/��y��	�-�2�d���h�=u����6���*=�&@v�!~��:�����΁����mՋ�VR�9�^�\��T�6�p"��iwY�
U��Y)u�C66`
��`�#V�kc��Zd�cz�ߓ  �S�[~1�z'
�e��Lb��{���F�!ThF�%�T�J%5��*g��7���[wi�e"� u����BJZ�u>`�q���^~���gC]�՛����C�?�
��w��5��ұ	����u,fSLI6GP��b�I&�~A����Q���5���X޴�D{��fóQ�Ei��x��!}�L�fk�5Y�3�����@�2Ԣ^�.x�K4tBx�?�sL��GZ�#b��)�oA��1]Ǜ�&3t�1hx���K�82�k#�g,��(K�-+�]߃,�9K�˴����ԳuZq�i���X�V$���i��]�i�DC'�V@G�k�ʷp�������=g�f7��I�Áo��4���T�x���8�h�S�&��/�^� 0��k��Ş����#tE��F�d���fE���Y��)����h�ʂ0ȣ5u�����Q�����0H:�]���C�W�z��w��?!Н�rD/�rA��3�����jj�'��AUF��z�����|����ȳ]D�Z\�ܸ�E'�����N���x��UZU�WxK\��:I+܃%��<��ş��$e;I�O����n�#�)�6}f�j���KՎ{$l��/��P�^�!;�w��������h����Ģ�SI庆�R�T��{�"�;�a v�=��I((r���](��Ϯ�M>�FV~0�ոb%������@� gF9Y҉�Nܥ�<[L|�%�O�dɻ��+�KEnIU�6��K���]�l�Z�*sbd
;��:�U��F:Q s3t`�ooW�@0ȍ�!��"Xߒ�`}KZl �/1�W�@K��Kr�J��4�M)�{�5gϜ��3(�C8���	9��9�ϝ8��Ƹ�|�GB�]gC�L�	�i>�a�#!t�=�K.o�z�1;�
H�޲U�W�.�,��	a� }J���9�0?���9^�fa!A	%m��d#�DAw��o�ot�9�^��I�{n3Α�?"�����Ҵ/$����M���l�h�cZ��t�4�4Vt�	�؉�8�q�QN���ei�T�^�&H�K6rB��}-����s ���+�N�&�='�j4W������}�d;���
����B%��²��*)��Ky�w�0,�"Ju�i)x�����;w�p��L�7����cZݱ����-����Pw�����}�I�	��=����*�'%�V�u���Y���\�4%�laږ��V##���G�KM�<��B��c8nw��)9�j�Ժ
�n³6�O��Z�������څ�&WQKV*�<�g5}�v���"ӊvN����j9iWLV��0�쓣.�k�Y��Q��/���D4�[���pms�Vu�|S�M��Էӵ�9|����Y���C���N�U�?*Zqrn�s(D6�<e�B9=���vr�s��ގ�^VɆ�ƅ�g��*�i\��Bx�ZM��T K^^���D(�E�Z�s^�G���4��>,�i-���m�A_#��)I���Y�*�X�0+�^��%n[#H�b��N"�=���=
Q2��{��8I��
��k!���k��<D}!�AP��dI`yr�YoIL~��&��	]%-���ہ"١�Z�M�8c����p�<�64p���������"_��}|�61Hwd�I������7�$�����z�NX�zФQw�F����zuO�I�mcAﾞ�cG�H���|����'���AX��}yi�KT,)��ZN�"eI��lQĺ������2�{{N��rb�(,Ŷ������
h$U5߅�Q��Q� D������S��hz�BX�)[2�O^.q�*���QQ;p亱�|.��%f���L1U'�����*�:^:';�*��?夵c�!�z�';R��ݽ# Hz��6u����i������՛W��WW7//�������������jqy��ܠ�|~�f���n������۷������Ѭ�      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �   �   x���A�0�ᵜ�ДB�5n�`Sa�FhI���q+L�&]���M*�0w�*5#x�'�A4�"�s�Y�k��M#>�o��4�2�1�J����lu��ˋ�彰v�S�~=w]?�w�ru��3�ﬅ:��K*�:߹�����S��_��F:���~I�a�f8;�?��;�!���'�bQ� +o��      �   7   x�ȹ  ���[�����l�T���l���6I;v2�b��~V�"�cT	*      �   x   x�3�t,-�H�+�LN,IM�tIMK,�)Q(��IUH�,K�S(�WHDV�PZ�Z�ǉ"�id`d�k`�kd�`h`ejae`�g`l�S<����8J�r2�qX[������&��������� QREm      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �     