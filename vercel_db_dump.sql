--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: default
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO "default";

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: default
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Article; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public."Article" (
    id text NOT NULL,
    article_metadata_id text NOT NULL,
    quick_look text,
    description text,
    content text NOT NULL
);


ALTER TABLE public."Article" OWNER TO "default";

--
-- Name: ArticleMetadata; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public."ArticleMetadata" (
    id text NOT NULL,
    title text NOT NULL,
    word_count integer DEFAULT 0 NOT NULL,
    semrush_score double precision DEFAULT 0.0 NOT NULL,
    author_id text NOT NULL,
    category_id text,
    status_id text NOT NULL,
    main_keyword_id text,
    get_info_id text NOT NULL,
    website_id text,
    goal_word_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public."ArticleMetadata" OWNER TO "default";

--
-- Name: Category; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public."Category" (
    id text NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."Category" OWNER TO "default";

--
-- Name: Country; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public."Country" (
    id text NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."Country" OWNER TO "default";

--
-- Name: GetInfo; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public."GetInfo" (
    id text NOT NULL,
    date_created timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    date_updated timestamp(3) without time zone NOT NULL,
    date_deleted timestamp(3) without time zone,
    last_modified_by_id text NOT NULL,
    created_by_id text NOT NULL
);


ALTER TABLE public."GetInfo" OWNER TO "default";

--
-- Name: Keyword; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public."Keyword" (
    id text NOT NULL,
    keyword text NOT NULL,
    evergreen boolean DEFAULT false NOT NULL,
    volume integer DEFAULT 0 NOT NULL,
    keyword_density integer DEFAULT 0 NOT NULL,
    country_id text,
    get_info_id text NOT NULL
);


ALTER TABLE public."Keyword" OWNER TO "default";

--
-- Name: Role; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public."Role" (
    id text NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."Role" OWNER TO "default";

--
-- Name: Status; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public."Status" (
    id text NOT NULL,
    status text NOT NULL,
    "timestamp" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Status" OWNER TO "default";

--
-- Name: User; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public."User" (
    id text NOT NULL,
    email text NOT NULL,
    password_hash text NOT NULL,
    name text NOT NULL,
    last_name text NOT NULL,
    author_name text NOT NULL,
    role_id text
);


ALTER TABLE public."User" OWNER TO "default";

--
-- Name: Website; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public."Website" (
    id text NOT NULL,
    name text NOT NULL,
    url text NOT NULL
);


ALTER TABLE public."Website" OWNER TO "default";

--
-- Name: _ArticleKeywords; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public."_ArticleKeywords" (
    "A" text NOT NULL,
    "B" text NOT NULL
);


ALTER TABLE public."_ArticleKeywords" OWNER TO "default";

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO "default";

--
-- Data for Name: Article; Type: TABLE DATA; Schema: public; Owner: default
--

COPY public."Article" (id, article_metadata_id, quick_look, description, content) FROM stdin;
\.


--
-- Data for Name: ArticleMetadata; Type: TABLE DATA; Schema: public; Owner: default
--

COPY public."ArticleMetadata" (id, title, word_count, semrush_score, author_id, category_id, status_id, main_keyword_id, get_info_id, website_id, goal_word_count) FROM stdin;
efcec7dd-fddf-473f-9719-1f579128432e	What Are AI ETFs	0	0	00da4e50-a124-4415-8978-186270afc6d3	\N	3a4739cb-f941-4305-939e-c84d9ca06bbc	\N	08705da8-4881-4981-8059-516c227e7066	\N	0
95061778-79b7-4e5c-986a-2a3a5552fe35	GMT Token	0	0	00da4e50-a124-4415-8978-186270afc6d3	\N	3a4739cb-f941-4305-939e-c84d9ca06bbc	ac940351-62ee-4f35-b209-096e8a8bac6a	08705da8-4881-4981-8059-516c227e7066	\N	0
\.


--
-- Data for Name: Category; Type: TABLE DATA; Schema: public; Owner: default
--

COPY public."Category" (id, name) FROM stdin;
\.


--
-- Data for Name: Country; Type: TABLE DATA; Schema: public; Owner: default
--

COPY public."Country" (id, name) FROM stdin;
cf840871-c57f-425d-a7d8-e0f22c0891a8	UK
36a48d33-f3e6-4738-8951-67af34ad045d	IN
1eb5e43b-c7d9-4d85-a221-18bb67f32559	US
\.


--
-- Data for Name: GetInfo; Type: TABLE DATA; Schema: public; Owner: default
--

COPY public."GetInfo" (id, date_created, date_updated, date_deleted, last_modified_by_id, created_by_id) FROM stdin;
2fac8a15-e02b-49f6-b5f6-97fbbeec520a	2024-07-25 20:20:11.338	2024-07-25 20:19:47.371	\N	00da4e50-a124-4415-8978-186270afc6d3	00da4e50-a124-4415-8978-186270afc6d3
08705da8-4881-4981-8059-516c227e7066	2024-07-20 20:34:21.338	2024-07-25 20:36:05.955	\N	00da4e50-a124-4415-8978-186270afc6d3	00da4e50-a124-4415-8978-186270afc6d3
d04c1ea0-c09a-4bcf-9c9c-9c49eaba026a	2024-07-26 17:59:25.685	2024-07-26 17:59:06.909	\N	00da4e50-a124-4415-8978-186270afc6d3	00da4e50-a124-4415-8978-186270afc6d3
\.


--
-- Data for Name: Keyword; Type: TABLE DATA; Schema: public; Owner: default
--

COPY public."Keyword" (id, keyword, evergreen, volume, keyword_density, country_id, get_info_id) FROM stdin;
2517c5ac-4672-4775-8fce-73677cf21d3c	elon musk	t	750	250	\N	d04c1ea0-c09a-4bcf-9c9c-9c49eaba026a
5120406e-c819-493b-887c-fe41577ddcc4	usd/aud rate today	f	500	150	1eb5e43b-c7d9-4d85-a221-18bb67f32559	d04c1ea0-c09a-4bcf-9c9c-9c49eaba026a
ac940351-62ee-4f35-b209-096e8a8bac6a	gomining	t	255	1200	\N	2fac8a15-e02b-49f6-b5f6-97fbbeec520a
8777a099-2880-44df-b4e4-4a631e44e3b8	spacex	t	80	150	cf840871-c57f-425d-a7d8-e0f22c0891a8	d04c1ea0-c09a-4bcf-9c9c-9c49eaba026a
5352cd96-c28a-4cae-a6d4-243759bf13eb	ai etf	f	540	380	\N	d04c1ea0-c09a-4bcf-9c9c-9c49eaba026a
86bbce02-5587-4358-afe3-530a8441ab84	ai stocks	f	3910	500	cf840871-c57f-425d-a7d8-e0f22c0891a8	d04c1ea0-c09a-4bcf-9c9c-9c49eaba026a
f69e9796-bce5-4fd8-b0ab-c821617a22e8	gmt	f	0	440	\N	08705da8-4881-4981-8059-516c227e7066
\.


--
-- Data for Name: Role; Type: TABLE DATA; Schema: public; Owner: default
--

COPY public."Role" (id, name) FROM stdin;
fb90d15d-20cb-4b54-9ed9-6635ca426c53	Writer
307eabd4-0ff1-44bc-b83f-bb73e6bd62ce	Editor
8bc23880-1b6c-48e9-9a0a-f33a679bf4ec	SEO
82c550cc-d3ca-4487-bc15-0afd65237643	Manager
\.


--
-- Data for Name: Status; Type: TABLE DATA; Schema: public; Owner: default
--

COPY public."Status" (id, status, "timestamp") FROM stdin;
3a4739cb-f941-4305-939e-c84d9ca06bbc	Drafted	1970-01-01 00:00:00
024c648f-6b00-43f2-bfd2-ef31895b922f	Edited	1970-01-01 00:00:00
3e2c08f1-48a3-4445-94cd-3b411496c746	Published	1970-01-01 00:00:00
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: default
--

COPY public."User" (id, email, password_hash, name, last_name, author_name, role_id) FROM stdin;
00da4e50-a124-4415-8978-186270afc6d3	giorgi.tch@magnet-digital.net	$2a$10$qZzSyVH5QcQPklSRzCUECu571sSMdo8YZW0teMMxgsmM/b8WOmA.e	Giorgi	Tchelidze	George T.	307eabd4-0ff1-44bc-b83f-bb73e6bd62ce
da12068a-bcca-4619-8d5e-bf15f35b975f	nano.gob@magnet-digital.net	$2a$10$qZzSyVH5QcQPklSRzCUECu571sSMdo8YZW0teMMxgsmM/b8WOmA.e	Nano	Gobechia	Emily Miller	fb90d15d-20cb-4b54-9ed9-6635ca426c53
05582592-d149-4d20-916f-3b8f983fcea9	lana.d@magnet-digital.net	$2a$10$qZzSyVH5QcQPklSRzCUECu571sSMdo8YZW0teMMxgsmM/b8WOmA.e	Lana	Devidze	Lana D.	82c550cc-d3ca-4487-bc15-0afd65237643
e205c3a6-263b-47ab-9d3a-73310da48239	manano@manget-digital.net	$2a$10$qZzSyVH5QcQPklSRzCUECu571sSMdo8YZW0teMMxgsmM/b8WOmA.e	Manano	Lursmanidze	Matilde Smith	8bc23880-1b6c-48e9-9a0a-f33a679bf4ec
\.


--
-- Data for Name: Website; Type: TABLE DATA; Schema: public; Owner: default
--

COPY public."Website" (id, name, url) FROM stdin;
\.


--
-- Data for Name: _ArticleKeywords; Type: TABLE DATA; Schema: public; Owner: default
--

COPY public."_ArticleKeywords" ("A", "B") FROM stdin;
95061778-79b7-4e5c-986a-2a3a5552fe35	ac940351-62ee-4f35-b209-096e8a8bac6a
95061778-79b7-4e5c-986a-2a3a5552fe35	f69e9796-bce5-4fd8-b0ab-c821617a22e8
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: default
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
7657f400-f3d1-49cc-98b9-ba0d9d7e6a7f	3ffe80a492cd80c784f5755b8e3c646e9b8e1868e59f4bd6c36aec7d4dbdac84	2024-07-24 20:31:41.465474+00	20240724203140_init	\N	\N	2024-07-24 20:31:41.098904+00	1
6a1011af-c97a-42d2-9b76-a2d7bf6960bc	a353039a76fdd003938ee7f0f3ac84e7b16aca8d36f7017b2b602e6e8fa5770e	2024-07-26 15:30:00.396683+00	20240726152959_add_website_to_articlemetadata	\N	\N	2024-07-26 15:30:00.025866+00	1
534e18b2-b1b0-4dbc-a2a8-0a222e312439	d3d9a8ee5201e5c709f73cf83fb273b0850f6b2bde460b3689257a20f1fd46ff	2024-07-28 12:00:00.371733+00	20240728115959_add_goal_word_count	\N	\N	2024-07-28 12:00:00.025547+00	1
\.


--
-- Name: ArticleMetadata ArticleMetadata_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."ArticleMetadata"
    ADD CONSTRAINT "ArticleMetadata_pkey" PRIMARY KEY (id);


--
-- Name: Article Article_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."Article"
    ADD CONSTRAINT "Article_pkey" PRIMARY KEY (id);


--
-- Name: Category Category_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY (id);


--
-- Name: Country Country_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."Country"
    ADD CONSTRAINT "Country_pkey" PRIMARY KEY (id);


--
-- Name: GetInfo GetInfo_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."GetInfo"
    ADD CONSTRAINT "GetInfo_pkey" PRIMARY KEY (id);


--
-- Name: Keyword Keyword_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."Keyword"
    ADD CONSTRAINT "Keyword_pkey" PRIMARY KEY (id);


--
-- Name: Role Role_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."Role"
    ADD CONSTRAINT "Role_pkey" PRIMARY KEY (id);


--
-- Name: Status Status_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."Status"
    ADD CONSTRAINT "Status_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: Website Website_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."Website"
    ADD CONSTRAINT "Website_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Article_article_metadata_id_key; Type: INDEX; Schema: public; Owner: default
--

CREATE UNIQUE INDEX "Article_article_metadata_id_key" ON public."Article" USING btree (article_metadata_id);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: default
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: _ArticleKeywords_AB_unique; Type: INDEX; Schema: public; Owner: default
--

CREATE UNIQUE INDEX "_ArticleKeywords_AB_unique" ON public."_ArticleKeywords" USING btree ("A", "B");


--
-- Name: _ArticleKeywords_B_index; Type: INDEX; Schema: public; Owner: default
--

CREATE INDEX "_ArticleKeywords_B_index" ON public."_ArticleKeywords" USING btree ("B");


--
-- Name: article_id; Type: INDEX; Schema: public; Owner: default
--

CREATE INDEX article_id ON public."Article" USING btree (id);


--
-- Name: author_id; Type: INDEX; Schema: public; Owner: default
--

CREATE INDEX author_id ON public."ArticleMetadata" USING btree (author_id);


--
-- Name: category_id; Type: INDEX; Schema: public; Owner: default
--

CREATE INDEX category_id ON public."ArticleMetadata" USING btree (category_id);


--
-- Name: created_by_id; Type: INDEX; Schema: public; Owner: default
--

CREATE INDEX created_by_id ON public."GetInfo" USING btree (created_by_id);


--
-- Name: keyword_id; Type: INDEX; Schema: public; Owner: default
--

CREATE INDEX keyword_id ON public."Keyword" USING btree (id);


--
-- Name: last_modified_by_id; Type: INDEX; Schema: public; Owner: default
--

CREATE INDEX last_modified_by_id ON public."GetInfo" USING btree (last_modified_by_id);


--
-- Name: main_keyword_id; Type: INDEX; Schema: public; Owner: default
--

CREATE INDEX main_keyword_id ON public."ArticleMetadata" USING btree (main_keyword_id);


--
-- Name: role_id; Type: INDEX; Schema: public; Owner: default
--

CREATE INDEX role_id ON public."User" USING btree (role_id);


--
-- Name: status_id; Type: INDEX; Schema: public; Owner: default
--

CREATE INDEX status_id ON public."ArticleMetadata" USING btree (status_id);


--
-- Name: ArticleMetadata ArticleMetadata_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."ArticleMetadata"
    ADD CONSTRAINT "ArticleMetadata_author_id_fkey" FOREIGN KEY (author_id) REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ArticleMetadata ArticleMetadata_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."ArticleMetadata"
    ADD CONSTRAINT "ArticleMetadata_category_id_fkey" FOREIGN KEY (category_id) REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ArticleMetadata ArticleMetadata_get_info_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."ArticleMetadata"
    ADD CONSTRAINT "ArticleMetadata_get_info_id_fkey" FOREIGN KEY (get_info_id) REFERENCES public."GetInfo"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ArticleMetadata ArticleMetadata_main_keyword_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."ArticleMetadata"
    ADD CONSTRAINT "ArticleMetadata_main_keyword_id_fkey" FOREIGN KEY (main_keyword_id) REFERENCES public."Keyword"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ArticleMetadata ArticleMetadata_status_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."ArticleMetadata"
    ADD CONSTRAINT "ArticleMetadata_status_id_fkey" FOREIGN KEY (status_id) REFERENCES public."Status"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ArticleMetadata ArticleMetadata_website_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."ArticleMetadata"
    ADD CONSTRAINT "ArticleMetadata_website_id_fkey" FOREIGN KEY (website_id) REFERENCES public."Website"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Article Article_article_metadata_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."Article"
    ADD CONSTRAINT "Article_article_metadata_id_fkey" FOREIGN KEY (article_metadata_id) REFERENCES public."ArticleMetadata"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: GetInfo GetInfo_created_by_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."GetInfo"
    ADD CONSTRAINT "GetInfo_created_by_id_fkey" FOREIGN KEY (created_by_id) REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: GetInfo GetInfo_last_modified_by_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."GetInfo"
    ADD CONSTRAINT "GetInfo_last_modified_by_id_fkey" FOREIGN KEY (last_modified_by_id) REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Keyword Keyword_country_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."Keyword"
    ADD CONSTRAINT "Keyword_country_id_fkey" FOREIGN KEY (country_id) REFERENCES public."Country"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Keyword Keyword_get_info_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."Keyword"
    ADD CONSTRAINT "Keyword_get_info_id_fkey" FOREIGN KEY (get_info_id) REFERENCES public."GetInfo"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: User User_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_role_id_fkey" FOREIGN KEY (role_id) REFERENCES public."Role"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: _ArticleKeywords _ArticleKeywords_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."_ArticleKeywords"
    ADD CONSTRAINT "_ArticleKeywords_A_fkey" FOREIGN KEY ("A") REFERENCES public."ArticleMetadata"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _ArticleKeywords _ArticleKeywords_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."_ArticleKeywords"
    ADD CONSTRAINT "_ArticleKeywords_B_fkey" FOREIGN KEY ("B") REFERENCES public."Keyword"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: default
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


--
-- PostgreSQL database dump complete
--

