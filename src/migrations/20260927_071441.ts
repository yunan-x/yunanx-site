import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_projects_blocks_image_width" AS ENUM('100', '75', '60', '40', 'icon');
  CREATE TYPE "public"."enum_projects_blocks_two_up_left_kind" AS ENUM('image', 'lottie');
  CREATE TYPE "public"."enum_projects_blocks_two_up_left_width" AS ENUM('100', '75', '60', '40', 'icon');
  CREATE TYPE "public"."enum_projects_blocks_two_up_right_kind" AS ENUM('image', 'lottie');
  CREATE TYPE "public"."enum_projects_blocks_two_up_right_width" AS ENUM('100', '75', '60', '40', 'icon');
  CREATE TYPE "public"."enum_projects_blocks_grid_columns" AS ENUM('3', '4', '8');
  CREATE TYPE "public"."enum_projects_blocks_columns_heading_size" AS ENUM('h1', 'h2', 'h3');
  CREATE TYPE "public"."enum_projects_blocks_columns_left_image_width" AS ENUM('100', '75', '60', '40', 'icon');
  CREATE TYPE "public"."enum_projects_blocks_columns_media_kind" AS ENUM('none', 'image', 'video', 'lottie');
  CREATE TYPE "public"."enum_projects_blocks_columns_media_width" AS ENUM('100', '75', '60', '40', 'icon');
  CREATE TYPE "public"."enum_projects_blocks_video_size" AS ENUM('full', '300');
  CREATE TYPE "public"."enum_projects_blocks_lottie_width" AS ENUM('100', '75', '60', '40', 'icon');
  CREATE TYPE "public"."enum_projects_blocks_section_rows_wrapper" AS ENUM('center', 'center gap', 'wrap', 'vflex', 'none');
  CREATE TYPE "public"."enum_projects_blocks_section_background" AS ENUM('default', 'grey', 'dark', 'bg_grid', 'bg_waterdrop', 'bg_chip', 'deepsea', 'lolo_ui', 'lolo_ui white');
  CREATE TYPE "public"."enum_projects_blocks_section_padding" AS ENUM('section', 'section_0pad', 'sec_hero', 'none');
  CREATE TYPE "public"."enum_projects_hero_kind" AS ENUM('cover', 'image', 'video', 'none');
  CREATE TYPE "public"."enum_projects_hero_variant" AS ENUM('default', 'tg0', 'lolo', 'privasea', 'sudio', 'freepower');
  CREATE TYPE "public"."enum_projects_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__projects_v_blocks_image_width" AS ENUM('100', '75', '60', '40', 'icon');
  CREATE TYPE "public"."enum__projects_v_blocks_two_up_left_kind" AS ENUM('image', 'lottie');
  CREATE TYPE "public"."enum__projects_v_blocks_two_up_left_width" AS ENUM('100', '75', '60', '40', 'icon');
  CREATE TYPE "public"."enum__projects_v_blocks_two_up_right_kind" AS ENUM('image', 'lottie');
  CREATE TYPE "public"."enum__projects_v_blocks_two_up_right_width" AS ENUM('100', '75', '60', '40', 'icon');
  CREATE TYPE "public"."enum__projects_v_blocks_grid_columns" AS ENUM('3', '4', '8');
  CREATE TYPE "public"."enum__projects_v_blocks_columns_heading_size" AS ENUM('h1', 'h2', 'h3');
  CREATE TYPE "public"."enum__projects_v_blocks_columns_left_image_width" AS ENUM('100', '75', '60', '40', 'icon');
  CREATE TYPE "public"."enum__projects_v_blocks_columns_media_kind" AS ENUM('none', 'image', 'video', 'lottie');
  CREATE TYPE "public"."enum__projects_v_blocks_columns_media_width" AS ENUM('100', '75', '60', '40', 'icon');
  CREATE TYPE "public"."enum__projects_v_blocks_video_size" AS ENUM('full', '300');
  CREATE TYPE "public"."enum__projects_v_blocks_lottie_width" AS ENUM('100', '75', '60', '40', 'icon');
  CREATE TYPE "public"."enum__projects_v_blocks_section_rows_wrapper" AS ENUM('center', 'center gap', 'wrap', 'vflex', 'none');
  CREATE TYPE "public"."enum__projects_v_blocks_section_background" AS ENUM('default', 'grey', 'dark', 'bg_grid', 'bg_waterdrop', 'bg_chip', 'deepsea', 'lolo_ui', 'lolo_ui white');
  CREATE TYPE "public"."enum__projects_v_blocks_section_padding" AS ENUM('section', 'section_0pad', 'sec_hero', 'none');
  CREATE TYPE "public"."enum__projects_v_version_hero_kind" AS ENUM('cover', 'image', 'video', 'none');
  CREATE TYPE "public"."enum__projects_v_version_hero_variant" AS ENUM('default', 'tg0', 'lolo', 'privasea', 'sudio', 'freepower');
  CREATE TYPE "public"."enum__projects_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_works_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__works_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_redirects_to_type" AS ENUM('reference', 'custom');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_sm_url" varchar,
  	"sizes_sm_width" numeric,
  	"sizes_sm_height" numeric,
  	"sizes_sm_mime_type" varchar,
  	"sizes_sm_filesize" numeric,
  	"sizes_sm_filename" varchar,
  	"sizes_md_url" varchar,
  	"sizes_md_width" numeric,
  	"sizes_md_height" numeric,
  	"sizes_md_mime_type" varchar,
  	"sizes_md_filesize" numeric,
  	"sizes_md_filename" varchar,
  	"sizes_lg_url" varchar,
  	"sizes_lg_width" numeric,
  	"sizes_lg_height" numeric,
  	"sizes_lg_mime_type" varchar,
  	"sizes_lg_filesize" numeric,
  	"sizes_lg_filename" varchar,
  	"sizes_xl_url" varchar,
  	"sizes_xl_width" numeric,
  	"sizes_xl_height" numeric,
  	"sizes_xl_mime_type" varchar,
  	"sizes_xl_filesize" numeric,
  	"sizes_xl_filename" varchar
  );
  
  CREATE TABLE "projects_blocks_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"width" "enum_projects_blocks_image_width" DEFAULT '100',
  	"multiply" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_two_up" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"left_kind" "enum_projects_blocks_two_up_left_kind" DEFAULT 'image',
  	"left_image_id" integer,
  	"left_lottie_id" integer,
  	"left_width" "enum_projects_blocks_two_up_left_width" DEFAULT '100',
  	"right_kind" "enum_projects_blocks_two_up_right_kind" DEFAULT 'image',
  	"right_image_id" integer,
  	"right_lottie_id" integer,
  	"right_width" "enum_projects_blocks_two_up_right_width" DEFAULT '100',
  	"gap" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_grid_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "projects_blocks_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"columns" "enum_projects_blocks_grid_columns" DEFAULT '3',
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"body" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"heading_size" "enum_projects_blocks_columns_heading_size" DEFAULT 'h1',
  	"subtitle" varchar,
  	"light_subtitle" boolean,
  	"left_image_id" integer,
  	"left_image_width" "enum_projects_blocks_columns_left_image_width" DEFAULT '100',
  	"facts" jsonb,
  	"center_right" boolean DEFAULT true,
  	"media_kind" "enum_projects_blocks_columns_media_kind" DEFAULT 'none',
  	"media_image_id" integer,
  	"media_width" "enum_projects_blocks_columns_media_width" DEFAULT '100',
  	"media_video_mp4_id" integer,
  	"media_video_webm_id" integer,
  	"media_video_poster_id" integer,
  	"media_lottie_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"video_mp4_id" integer,
  	"video_webm_id" integer,
  	"video_poster_id" integer,
  	"size" "enum_projects_blocks_video_size" DEFAULT 'full',
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_lottie" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"lottie_id" integer,
  	"width" "enum_projects_blocks_lottie_width" DEFAULT '100',
  	"loop" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_section_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"wrapper" "enum_projects_blocks_section_rows_wrapper" DEFAULT 'center',
  	"contained" boolean DEFAULT true
  );
  
  CREATE TABLE "projects_blocks_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background" "enum_projects_blocks_section_background" DEFAULT 'default',
  	"padding" "enum_projects_blocks_section_padding" DEFAULT 'section',
  	"block_name" varchar
  );
  
  CREATE TABLE "projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"order" numeric DEFAULT 0,
  	"hero_kind" "enum_projects_hero_kind" DEFAULT 'cover',
  	"hero_image_id" integer,
  	"hero_variant" "enum_projects_hero_variant" DEFAULT 'default',
  	"hero_video_mp4_id" integer,
  	"hero_video_webm_id" integer,
  	"hero_video_poster_id" integer,
  	"subtitle" varchar,
  	"card_image_id" integer,
  	"list_image_id" integer,
  	"grey_card" boolean,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_projects_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_projects_v_blocks_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"width" "enum__projects_v_blocks_image_width" DEFAULT '100',
  	"multiply" boolean,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_two_up" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"left_kind" "enum__projects_v_blocks_two_up_left_kind" DEFAULT 'image',
  	"left_image_id" integer,
  	"left_lottie_id" integer,
  	"left_width" "enum__projects_v_blocks_two_up_left_width" DEFAULT '100',
  	"right_kind" "enum__projects_v_blocks_two_up_right_kind" DEFAULT 'image',
  	"right_image_id" integer,
  	"right_lottie_id" integer,
  	"right_width" "enum__projects_v_blocks_two_up_right_width" DEFAULT '100',
  	"gap" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_grid_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"columns" "enum__projects_v_blocks_grid_columns" DEFAULT '3',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"body" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"heading_size" "enum__projects_v_blocks_columns_heading_size" DEFAULT 'h1',
  	"subtitle" varchar,
  	"light_subtitle" boolean,
  	"left_image_id" integer,
  	"left_image_width" "enum__projects_v_blocks_columns_left_image_width" DEFAULT '100',
  	"facts" jsonb,
  	"center_right" boolean DEFAULT true,
  	"media_kind" "enum__projects_v_blocks_columns_media_kind" DEFAULT 'none',
  	"media_image_id" integer,
  	"media_width" "enum__projects_v_blocks_columns_media_width" DEFAULT '100',
  	"media_video_mp4_id" integer,
  	"media_video_webm_id" integer,
  	"media_video_poster_id" integer,
  	"media_lottie_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"video_mp4_id" integer,
  	"video_webm_id" integer,
  	"video_poster_id" integer,
  	"size" "enum__projects_v_blocks_video_size" DEFAULT 'full',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_lottie" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"lottie_id" integer,
  	"width" "enum__projects_v_blocks_lottie_width" DEFAULT '100',
  	"loop" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_section_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"wrapper" "enum__projects_v_blocks_section_rows_wrapper" DEFAULT 'center',
  	"contained" boolean DEFAULT true,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background" "enum__projects_v_blocks_section_background" DEFAULT 'default',
  	"padding" "enum__projects_v_blocks_section_padding" DEFAULT 'section',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_order" numeric DEFAULT 0,
  	"version_hero_kind" "enum__projects_v_version_hero_kind" DEFAULT 'cover',
  	"version_hero_image_id" integer,
  	"version_hero_variant" "enum__projects_v_version_hero_variant" DEFAULT 'default',
  	"version_hero_video_mp4_id" integer,
  	"version_hero_video_webm_id" integer,
  	"version_hero_video_poster_id" integer,
  	"version_subtitle" varchar,
  	"version_card_image_id" integer,
  	"version_list_image_id" integer,
  	"version_grey_card" boolean,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__projects_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "works_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "works" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"order" numeric DEFAULT 0,
  	"year" varchar,
  	"category" varchar,
  	"hero_image_id" integer,
  	"body" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_works_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_works_v_version_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_works_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_order" numeric DEFAULT 0,
  	"version_year" varchar,
  	"version_category" varchar,
  	"version_hero_image_id" integer,
  	"version_body" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__works_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "redirects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"from" varchar NOT NULL,
  	"to_type" "enum_redirects_to_type" DEFAULT 'reference',
  	"to_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "redirects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"projects_id" integer,
  	"works_id" integer
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"projects_id" integer,
  	"works_id" integer,
  	"redirects_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "home_worked_with" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "home_skills" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "home_selected_work" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"year" varchar NOT NULL,
  	"client" varchar NOT NULL
  );
  
  CREATE TABLE "home_brands" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer NOT NULL
  );
  
  CREATE TABLE "home" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Hi, I am Yunan Xing',
  	"heading" varchar NOT NULL,
  	"intro" varchar,
  	"hero_video_mp4_id" integer,
  	"hero_video_webm_id" integer,
  	"hero_video_poster_id" integer,
  	"photo_id" integer,
  	"featured_video_mp4_id" integer,
  	"featured_video_webm_id" integer,
  	"featured_video_poster_id" integer,
  	"featured_text" varchar,
  	"web_heading" varchar DEFAULT 'Web & Products',
  	"web_video_top_mp4_id" integer,
  	"web_video_top_webm_id" integer,
  	"web_video_top_poster_id" integer,
  	"web_video_bottom_mp4_id" integer,
  	"web_video_bottom_webm_id" integer,
  	"web_video_bottom_poster_id" integer,
  	"art_heading" varchar DEFAULT 'Art direction & Graphics',
  	"archive_heading" varchar DEFAULT 'Old & New Archive',
  	"brands_heading" varchar DEFAULT 'Brands I worked with',
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"projects_id" integer
  );
  
  CREATE TABLE "about" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'About Yunan' NOT NULL,
  	"bio" jsonb,
  	"button_label" varchar DEFAULT 'Contact',
  	"photo_id" integer,
  	"timeline_heading" varchar DEFAULT 'Life never moves in a straight line.',
  	"timeline_desktop_id" integer,
  	"timeline_mobile_id" integer,
  	"show_contact_form" boolean DEFAULT true,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Drop me a message' NOT NULL,
  	"subheading" varchar DEFAULT 'Let''s build and create fun things together!',
  	"formspree_id" varchar NOT NULL,
  	"success_message" varchar DEFAULT 'Thank you! I will get back to you as soon as possible!',
  	"error_message" varchar DEFAULT 'Oops! Something went wrong while submitting the form.',
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_social" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"icon_id" integer NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"logo_hover_id" integer,
  	"site_name" varchar DEFAULT 'Yunan',
  	"default_description" varchar,
  	"default_og_image_id" integer,
  	"favicon_id" integer,
  	"apple_touch_icon_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_image" ADD CONSTRAINT "projects_blocks_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_image" ADD CONSTRAINT "projects_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_two_up" ADD CONSTRAINT "projects_blocks_two_up_left_image_id_media_id_fk" FOREIGN KEY ("left_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_two_up" ADD CONSTRAINT "projects_blocks_two_up_left_lottie_id_media_id_fk" FOREIGN KEY ("left_lottie_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_two_up" ADD CONSTRAINT "projects_blocks_two_up_right_image_id_media_id_fk" FOREIGN KEY ("right_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_two_up" ADD CONSTRAINT "projects_blocks_two_up_right_lottie_id_media_id_fk" FOREIGN KEY ("right_lottie_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_two_up" ADD CONSTRAINT "projects_blocks_two_up_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_grid_images" ADD CONSTRAINT "projects_blocks_grid_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_grid_images" ADD CONSTRAINT "projects_blocks_grid_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_grid" ADD CONSTRAINT "projects_blocks_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_text" ADD CONSTRAINT "projects_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_columns" ADD CONSTRAINT "projects_blocks_columns_left_image_id_media_id_fk" FOREIGN KEY ("left_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_columns" ADD CONSTRAINT "projects_blocks_columns_media_image_id_media_id_fk" FOREIGN KEY ("media_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_columns" ADD CONSTRAINT "projects_blocks_columns_media_video_mp4_id_media_id_fk" FOREIGN KEY ("media_video_mp4_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_columns" ADD CONSTRAINT "projects_blocks_columns_media_video_webm_id_media_id_fk" FOREIGN KEY ("media_video_webm_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_columns" ADD CONSTRAINT "projects_blocks_columns_media_video_poster_id_media_id_fk" FOREIGN KEY ("media_video_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_columns" ADD CONSTRAINT "projects_blocks_columns_media_lottie_id_media_id_fk" FOREIGN KEY ("media_lottie_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_columns" ADD CONSTRAINT "projects_blocks_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_video" ADD CONSTRAINT "projects_blocks_video_video_mp4_id_media_id_fk" FOREIGN KEY ("video_mp4_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_video" ADD CONSTRAINT "projects_blocks_video_video_webm_id_media_id_fk" FOREIGN KEY ("video_webm_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_video" ADD CONSTRAINT "projects_blocks_video_video_poster_id_media_id_fk" FOREIGN KEY ("video_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_video" ADD CONSTRAINT "projects_blocks_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_lottie" ADD CONSTRAINT "projects_blocks_lottie_lottie_id_media_id_fk" FOREIGN KEY ("lottie_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_lottie" ADD CONSTRAINT "projects_blocks_lottie_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_section_rows" ADD CONSTRAINT "projects_blocks_section_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_section" ADD CONSTRAINT "projects_blocks_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_hero_video_mp4_id_media_id_fk" FOREIGN KEY ("hero_video_mp4_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_hero_video_webm_id_media_id_fk" FOREIGN KEY ("hero_video_webm_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_hero_video_poster_id_media_id_fk" FOREIGN KEY ("hero_video_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_card_image_id_media_id_fk" FOREIGN KEY ("card_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_list_image_id_media_id_fk" FOREIGN KEY ("list_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_image" ADD CONSTRAINT "_projects_v_blocks_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_image" ADD CONSTRAINT "_projects_v_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_two_up" ADD CONSTRAINT "_projects_v_blocks_two_up_left_image_id_media_id_fk" FOREIGN KEY ("left_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_two_up" ADD CONSTRAINT "_projects_v_blocks_two_up_left_lottie_id_media_id_fk" FOREIGN KEY ("left_lottie_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_two_up" ADD CONSTRAINT "_projects_v_blocks_two_up_right_image_id_media_id_fk" FOREIGN KEY ("right_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_two_up" ADD CONSTRAINT "_projects_v_blocks_two_up_right_lottie_id_media_id_fk" FOREIGN KEY ("right_lottie_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_two_up" ADD CONSTRAINT "_projects_v_blocks_two_up_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_grid_images" ADD CONSTRAINT "_projects_v_blocks_grid_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_grid_images" ADD CONSTRAINT "_projects_v_blocks_grid_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_grid" ADD CONSTRAINT "_projects_v_blocks_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_text" ADD CONSTRAINT "_projects_v_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_columns" ADD CONSTRAINT "_projects_v_blocks_columns_left_image_id_media_id_fk" FOREIGN KEY ("left_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_columns" ADD CONSTRAINT "_projects_v_blocks_columns_media_image_id_media_id_fk" FOREIGN KEY ("media_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_columns" ADD CONSTRAINT "_projects_v_blocks_columns_media_video_mp4_id_media_id_fk" FOREIGN KEY ("media_video_mp4_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_columns" ADD CONSTRAINT "_projects_v_blocks_columns_media_video_webm_id_media_id_fk" FOREIGN KEY ("media_video_webm_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_columns" ADD CONSTRAINT "_projects_v_blocks_columns_media_video_poster_id_media_id_fk" FOREIGN KEY ("media_video_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_columns" ADD CONSTRAINT "_projects_v_blocks_columns_media_lottie_id_media_id_fk" FOREIGN KEY ("media_lottie_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_columns" ADD CONSTRAINT "_projects_v_blocks_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_video" ADD CONSTRAINT "_projects_v_blocks_video_video_mp4_id_media_id_fk" FOREIGN KEY ("video_mp4_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_video" ADD CONSTRAINT "_projects_v_blocks_video_video_webm_id_media_id_fk" FOREIGN KEY ("video_webm_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_video" ADD CONSTRAINT "_projects_v_blocks_video_video_poster_id_media_id_fk" FOREIGN KEY ("video_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_video" ADD CONSTRAINT "_projects_v_blocks_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_lottie" ADD CONSTRAINT "_projects_v_blocks_lottie_lottie_id_media_id_fk" FOREIGN KEY ("lottie_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_lottie" ADD CONSTRAINT "_projects_v_blocks_lottie_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_section_rows" ADD CONSTRAINT "_projects_v_blocks_section_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_section" ADD CONSTRAINT "_projects_v_blocks_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_parent_id_projects_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_hero_video_mp4_id_media_id_fk" FOREIGN KEY ("version_hero_video_mp4_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_hero_video_webm_id_media_id_fk" FOREIGN KEY ("version_hero_video_webm_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_hero_video_poster_id_media_id_fk" FOREIGN KEY ("version_hero_video_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_card_image_id_media_id_fk" FOREIGN KEY ("version_card_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_list_image_id_media_id_fk" FOREIGN KEY ("version_list_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "works_gallery" ADD CONSTRAINT "works_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "works_gallery" ADD CONSTRAINT "works_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."works"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "works" ADD CONSTRAINT "works_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "works" ADD CONSTRAINT "works_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_works_v_version_gallery" ADD CONSTRAINT "_works_v_version_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_works_v_version_gallery" ADD CONSTRAINT "_works_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_works_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_works_v" ADD CONSTRAINT "_works_v_parent_id_works_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."works"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_works_v" ADD CONSTRAINT "_works_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_works_v" ADD CONSTRAINT "_works_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_works_fk" FOREIGN KEY ("works_id") REFERENCES "public"."works"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_works_fk" FOREIGN KEY ("works_id") REFERENCES "public"."works"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_worked_with" ADD CONSTRAINT "home_worked_with_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_skills" ADD CONSTRAINT "home_skills_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_selected_work" ADD CONSTRAINT "home_selected_work_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_brands" ADD CONSTRAINT "home_brands_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_brands" ADD CONSTRAINT "home_brands_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_hero_video_mp4_id_media_id_fk" FOREIGN KEY ("hero_video_mp4_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_hero_video_webm_id_media_id_fk" FOREIGN KEY ("hero_video_webm_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_hero_video_poster_id_media_id_fk" FOREIGN KEY ("hero_video_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_featured_video_mp4_id_media_id_fk" FOREIGN KEY ("featured_video_mp4_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_featured_video_webm_id_media_id_fk" FOREIGN KEY ("featured_video_webm_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_featured_video_poster_id_media_id_fk" FOREIGN KEY ("featured_video_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_web_video_top_mp4_id_media_id_fk" FOREIGN KEY ("web_video_top_mp4_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_web_video_top_webm_id_media_id_fk" FOREIGN KEY ("web_video_top_webm_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_web_video_top_poster_id_media_id_fk" FOREIGN KEY ("web_video_top_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_web_video_bottom_mp4_id_media_id_fk" FOREIGN KEY ("web_video_bottom_mp4_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_web_video_bottom_webm_id_media_id_fk" FOREIGN KEY ("web_video_bottom_webm_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_web_video_bottom_poster_id_media_id_fk" FOREIGN KEY ("web_video_bottom_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_rels" ADD CONSTRAINT "home_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_rels" ADD CONSTRAINT "home_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about" ADD CONSTRAINT "about_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about" ADD CONSTRAINT "about_timeline_desktop_id_media_id_fk" FOREIGN KEY ("timeline_desktop_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about" ADD CONSTRAINT "about_timeline_mobile_id_media_id_fk" FOREIGN KEY ("timeline_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about" ADD CONSTRAINT "about_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact" ADD CONSTRAINT "contact_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_nav" ADD CONSTRAINT "site_settings_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_social" ADD CONSTRAINT "site_settings_social_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_social" ADD CONSTRAINT "site_settings_social_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_hover_id_media_id_fk" FOREIGN KEY ("logo_hover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_default_og_image_id_media_id_fk" FOREIGN KEY ("default_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_favicon_id_media_id_fk" FOREIGN KEY ("favicon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_apple_touch_icon_id_media_id_fk" FOREIGN KEY ("apple_touch_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_sm_sizes_sm_filename_idx" ON "media" USING btree ("sizes_sm_filename");
  CREATE INDEX "media_sizes_md_sizes_md_filename_idx" ON "media" USING btree ("sizes_md_filename");
  CREATE INDEX "media_sizes_lg_sizes_lg_filename_idx" ON "media" USING btree ("sizes_lg_filename");
  CREATE INDEX "media_sizes_xl_sizes_xl_filename_idx" ON "media" USING btree ("sizes_xl_filename");
  CREATE INDEX "projects_blocks_image_order_idx" ON "projects_blocks_image" USING btree ("_order");
  CREATE INDEX "projects_blocks_image_parent_id_idx" ON "projects_blocks_image" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_image_path_idx" ON "projects_blocks_image" USING btree ("_path");
  CREATE INDEX "projects_blocks_image_image_idx" ON "projects_blocks_image" USING btree ("image_id");
  CREATE INDEX "projects_blocks_two_up_order_idx" ON "projects_blocks_two_up" USING btree ("_order");
  CREATE INDEX "projects_blocks_two_up_parent_id_idx" ON "projects_blocks_two_up" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_two_up_path_idx" ON "projects_blocks_two_up" USING btree ("_path");
  CREATE INDEX "projects_blocks_two_up_left_left_image_idx" ON "projects_blocks_two_up" USING btree ("left_image_id");
  CREATE INDEX "projects_blocks_two_up_left_left_lottie_idx" ON "projects_blocks_two_up" USING btree ("left_lottie_id");
  CREATE INDEX "projects_blocks_two_up_right_right_image_idx" ON "projects_blocks_two_up" USING btree ("right_image_id");
  CREATE INDEX "projects_blocks_two_up_right_right_lottie_idx" ON "projects_blocks_two_up" USING btree ("right_lottie_id");
  CREATE INDEX "projects_blocks_grid_images_order_idx" ON "projects_blocks_grid_images" USING btree ("_order");
  CREATE INDEX "projects_blocks_grid_images_parent_id_idx" ON "projects_blocks_grid_images" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_grid_images_image_idx" ON "projects_blocks_grid_images" USING btree ("image_id");
  CREATE INDEX "projects_blocks_grid_order_idx" ON "projects_blocks_grid" USING btree ("_order");
  CREATE INDEX "projects_blocks_grid_parent_id_idx" ON "projects_blocks_grid" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_grid_path_idx" ON "projects_blocks_grid" USING btree ("_path");
  CREATE INDEX "projects_blocks_text_order_idx" ON "projects_blocks_text" USING btree ("_order");
  CREATE INDEX "projects_blocks_text_parent_id_idx" ON "projects_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_text_path_idx" ON "projects_blocks_text" USING btree ("_path");
  CREATE INDEX "projects_blocks_columns_order_idx" ON "projects_blocks_columns" USING btree ("_order");
  CREATE INDEX "projects_blocks_columns_parent_id_idx" ON "projects_blocks_columns" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_columns_path_idx" ON "projects_blocks_columns" USING btree ("_path");
  CREATE INDEX "projects_blocks_columns_left_image_idx" ON "projects_blocks_columns" USING btree ("left_image_id");
  CREATE INDEX "projects_blocks_columns_media_media_image_idx" ON "projects_blocks_columns" USING btree ("media_image_id");
  CREATE INDEX "projects_blocks_columns_media_video_media_video_mp4_idx" ON "projects_blocks_columns" USING btree ("media_video_mp4_id");
  CREATE INDEX "projects_blocks_columns_media_video_media_video_webm_idx" ON "projects_blocks_columns" USING btree ("media_video_webm_id");
  CREATE INDEX "projects_blocks_columns_media_video_media_video_poster_idx" ON "projects_blocks_columns" USING btree ("media_video_poster_id");
  CREATE INDEX "projects_blocks_columns_media_media_lottie_idx" ON "projects_blocks_columns" USING btree ("media_lottie_id");
  CREATE INDEX "projects_blocks_video_order_idx" ON "projects_blocks_video" USING btree ("_order");
  CREATE INDEX "projects_blocks_video_parent_id_idx" ON "projects_blocks_video" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_video_path_idx" ON "projects_blocks_video" USING btree ("_path");
  CREATE INDEX "projects_blocks_video_video_video_mp4_idx" ON "projects_blocks_video" USING btree ("video_mp4_id");
  CREATE INDEX "projects_blocks_video_video_video_webm_idx" ON "projects_blocks_video" USING btree ("video_webm_id");
  CREATE INDEX "projects_blocks_video_video_video_poster_idx" ON "projects_blocks_video" USING btree ("video_poster_id");
  CREATE INDEX "projects_blocks_lottie_order_idx" ON "projects_blocks_lottie" USING btree ("_order");
  CREATE INDEX "projects_blocks_lottie_parent_id_idx" ON "projects_blocks_lottie" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_lottie_path_idx" ON "projects_blocks_lottie" USING btree ("_path");
  CREATE INDEX "projects_blocks_lottie_lottie_idx" ON "projects_blocks_lottie" USING btree ("lottie_id");
  CREATE INDEX "projects_blocks_section_rows_order_idx" ON "projects_blocks_section_rows" USING btree ("_order");
  CREATE INDEX "projects_blocks_section_rows_parent_id_idx" ON "projects_blocks_section_rows" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_section_order_idx" ON "projects_blocks_section" USING btree ("_order");
  CREATE INDEX "projects_blocks_section_parent_id_idx" ON "projects_blocks_section" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_section_path_idx" ON "projects_blocks_section" USING btree ("_path");
  CREATE UNIQUE INDEX "projects_slug_idx" ON "projects" USING btree ("slug");
  CREATE INDEX "projects_hero_hero_image_idx" ON "projects" USING btree ("hero_image_id");
  CREATE INDEX "projects_hero_video_hero_video_mp4_idx" ON "projects" USING btree ("hero_video_mp4_id");
  CREATE INDEX "projects_hero_video_hero_video_webm_idx" ON "projects" USING btree ("hero_video_webm_id");
  CREATE INDEX "projects_hero_video_hero_video_poster_idx" ON "projects" USING btree ("hero_video_poster_id");
  CREATE INDEX "projects_card_image_idx" ON "projects" USING btree ("card_image_id");
  CREATE INDEX "projects_list_image_idx" ON "projects" USING btree ("list_image_id");
  CREATE INDEX "projects_meta_meta_image_idx" ON "projects" USING btree ("meta_image_id");
  CREATE INDEX "projects_updated_at_idx" ON "projects" USING btree ("updated_at");
  CREATE INDEX "projects_created_at_idx" ON "projects" USING btree ("created_at");
  CREATE INDEX "projects__status_idx" ON "projects" USING btree ("_status");
  CREATE INDEX "_projects_v_blocks_image_order_idx" ON "_projects_v_blocks_image" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_image_parent_id_idx" ON "_projects_v_blocks_image" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_image_path_idx" ON "_projects_v_blocks_image" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_image_image_idx" ON "_projects_v_blocks_image" USING btree ("image_id");
  CREATE INDEX "_projects_v_blocks_two_up_order_idx" ON "_projects_v_blocks_two_up" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_two_up_parent_id_idx" ON "_projects_v_blocks_two_up" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_two_up_path_idx" ON "_projects_v_blocks_two_up" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_two_up_left_left_image_idx" ON "_projects_v_blocks_two_up" USING btree ("left_image_id");
  CREATE INDEX "_projects_v_blocks_two_up_left_left_lottie_idx" ON "_projects_v_blocks_two_up" USING btree ("left_lottie_id");
  CREATE INDEX "_projects_v_blocks_two_up_right_right_image_idx" ON "_projects_v_blocks_two_up" USING btree ("right_image_id");
  CREATE INDEX "_projects_v_blocks_two_up_right_right_lottie_idx" ON "_projects_v_blocks_two_up" USING btree ("right_lottie_id");
  CREATE INDEX "_projects_v_blocks_grid_images_order_idx" ON "_projects_v_blocks_grid_images" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_grid_images_parent_id_idx" ON "_projects_v_blocks_grid_images" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_grid_images_image_idx" ON "_projects_v_blocks_grid_images" USING btree ("image_id");
  CREATE INDEX "_projects_v_blocks_grid_order_idx" ON "_projects_v_blocks_grid" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_grid_parent_id_idx" ON "_projects_v_blocks_grid" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_grid_path_idx" ON "_projects_v_blocks_grid" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_text_order_idx" ON "_projects_v_blocks_text" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_text_parent_id_idx" ON "_projects_v_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_text_path_idx" ON "_projects_v_blocks_text" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_columns_order_idx" ON "_projects_v_blocks_columns" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_columns_parent_id_idx" ON "_projects_v_blocks_columns" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_columns_path_idx" ON "_projects_v_blocks_columns" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_columns_left_image_idx" ON "_projects_v_blocks_columns" USING btree ("left_image_id");
  CREATE INDEX "_projects_v_blocks_columns_media_media_image_idx" ON "_projects_v_blocks_columns" USING btree ("media_image_id");
  CREATE INDEX "_projects_v_blocks_columns_media_video_media_video_mp4_idx" ON "_projects_v_blocks_columns" USING btree ("media_video_mp4_id");
  CREATE INDEX "_projects_v_blocks_columns_media_video_media_video_webm_idx" ON "_projects_v_blocks_columns" USING btree ("media_video_webm_id");
  CREATE INDEX "_projects_v_blocks_columns_media_video_media_video_poste_idx" ON "_projects_v_blocks_columns" USING btree ("media_video_poster_id");
  CREATE INDEX "_projects_v_blocks_columns_media_media_lottie_idx" ON "_projects_v_blocks_columns" USING btree ("media_lottie_id");
  CREATE INDEX "_projects_v_blocks_video_order_idx" ON "_projects_v_blocks_video" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_video_parent_id_idx" ON "_projects_v_blocks_video" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_video_path_idx" ON "_projects_v_blocks_video" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_video_video_video_mp4_idx" ON "_projects_v_blocks_video" USING btree ("video_mp4_id");
  CREATE INDEX "_projects_v_blocks_video_video_video_webm_idx" ON "_projects_v_blocks_video" USING btree ("video_webm_id");
  CREATE INDEX "_projects_v_blocks_video_video_video_poster_idx" ON "_projects_v_blocks_video" USING btree ("video_poster_id");
  CREATE INDEX "_projects_v_blocks_lottie_order_idx" ON "_projects_v_blocks_lottie" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_lottie_parent_id_idx" ON "_projects_v_blocks_lottie" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_lottie_path_idx" ON "_projects_v_blocks_lottie" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_lottie_lottie_idx" ON "_projects_v_blocks_lottie" USING btree ("lottie_id");
  CREATE INDEX "_projects_v_blocks_section_rows_order_idx" ON "_projects_v_blocks_section_rows" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_section_rows_parent_id_idx" ON "_projects_v_blocks_section_rows" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_section_order_idx" ON "_projects_v_blocks_section" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_section_parent_id_idx" ON "_projects_v_blocks_section" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_section_path_idx" ON "_projects_v_blocks_section" USING btree ("_path");
  CREATE INDEX "_projects_v_parent_idx" ON "_projects_v" USING btree ("parent_id");
  CREATE INDEX "_projects_v_version_version_slug_idx" ON "_projects_v" USING btree ("version_slug");
  CREATE INDEX "_projects_v_version_hero_version_hero_image_idx" ON "_projects_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_projects_v_version_hero_video_version_hero_video_mp4_idx" ON "_projects_v" USING btree ("version_hero_video_mp4_id");
  CREATE INDEX "_projects_v_version_hero_video_version_hero_video_webm_idx" ON "_projects_v" USING btree ("version_hero_video_webm_id");
  CREATE INDEX "_projects_v_version_hero_video_version_hero_video_poster_idx" ON "_projects_v" USING btree ("version_hero_video_poster_id");
  CREATE INDEX "_projects_v_version_version_card_image_idx" ON "_projects_v" USING btree ("version_card_image_id");
  CREATE INDEX "_projects_v_version_version_list_image_idx" ON "_projects_v" USING btree ("version_list_image_id");
  CREATE INDEX "_projects_v_version_meta_version_meta_image_idx" ON "_projects_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_projects_v_version_version_updated_at_idx" ON "_projects_v" USING btree ("version_updated_at");
  CREATE INDEX "_projects_v_version_version_created_at_idx" ON "_projects_v" USING btree ("version_created_at");
  CREATE INDEX "_projects_v_version_version__status_idx" ON "_projects_v" USING btree ("version__status");
  CREATE INDEX "_projects_v_created_at_idx" ON "_projects_v" USING btree ("created_at");
  CREATE INDEX "_projects_v_updated_at_idx" ON "_projects_v" USING btree ("updated_at");
  CREATE INDEX "_projects_v_latest_idx" ON "_projects_v" USING btree ("latest");
  CREATE INDEX "works_gallery_order_idx" ON "works_gallery" USING btree ("_order");
  CREATE INDEX "works_gallery_parent_id_idx" ON "works_gallery" USING btree ("_parent_id");
  CREATE INDEX "works_gallery_image_idx" ON "works_gallery" USING btree ("image_id");
  CREATE UNIQUE INDEX "works_slug_idx" ON "works" USING btree ("slug");
  CREATE INDEX "works_hero_image_idx" ON "works" USING btree ("hero_image_id");
  CREATE INDEX "works_meta_meta_image_idx" ON "works" USING btree ("meta_image_id");
  CREATE INDEX "works_updated_at_idx" ON "works" USING btree ("updated_at");
  CREATE INDEX "works_created_at_idx" ON "works" USING btree ("created_at");
  CREATE INDEX "works__status_idx" ON "works" USING btree ("_status");
  CREATE INDEX "_works_v_version_gallery_order_idx" ON "_works_v_version_gallery" USING btree ("_order");
  CREATE INDEX "_works_v_version_gallery_parent_id_idx" ON "_works_v_version_gallery" USING btree ("_parent_id");
  CREATE INDEX "_works_v_version_gallery_image_idx" ON "_works_v_version_gallery" USING btree ("image_id");
  CREATE INDEX "_works_v_parent_idx" ON "_works_v" USING btree ("parent_id");
  CREATE INDEX "_works_v_version_version_slug_idx" ON "_works_v" USING btree ("version_slug");
  CREATE INDEX "_works_v_version_version_hero_image_idx" ON "_works_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_works_v_version_meta_version_meta_image_idx" ON "_works_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_works_v_version_version_updated_at_idx" ON "_works_v" USING btree ("version_updated_at");
  CREATE INDEX "_works_v_version_version_created_at_idx" ON "_works_v" USING btree ("version_created_at");
  CREATE INDEX "_works_v_version_version__status_idx" ON "_works_v" USING btree ("version__status");
  CREATE INDEX "_works_v_created_at_idx" ON "_works_v" USING btree ("created_at");
  CREATE INDEX "_works_v_updated_at_idx" ON "_works_v" USING btree ("updated_at");
  CREATE INDEX "_works_v_latest_idx" ON "_works_v" USING btree ("latest");
  CREATE UNIQUE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");
  CREATE INDEX "redirects_updated_at_idx" ON "redirects" USING btree ("updated_at");
  CREATE INDEX "redirects_created_at_idx" ON "redirects" USING btree ("created_at");
  CREATE INDEX "redirects_rels_order_idx" ON "redirects_rels" USING btree ("order");
  CREATE INDEX "redirects_rels_parent_idx" ON "redirects_rels" USING btree ("parent_id");
  CREATE INDEX "redirects_rels_path_idx" ON "redirects_rels" USING btree ("path");
  CREATE INDEX "redirects_rels_projects_id_idx" ON "redirects_rels" USING btree ("projects_id");
  CREATE INDEX "redirects_rels_works_id_idx" ON "redirects_rels" USING btree ("works_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("projects_id");
  CREATE INDEX "payload_locked_documents_rels_works_id_idx" ON "payload_locked_documents_rels" USING btree ("works_id");
  CREATE INDEX "payload_locked_documents_rels_redirects_id_idx" ON "payload_locked_documents_rels" USING btree ("redirects_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "home_worked_with_order_idx" ON "home_worked_with" USING btree ("_order");
  CREATE INDEX "home_worked_with_parent_id_idx" ON "home_worked_with" USING btree ("_parent_id");
  CREATE INDEX "home_skills_order_idx" ON "home_skills" USING btree ("_order");
  CREATE INDEX "home_skills_parent_id_idx" ON "home_skills" USING btree ("_parent_id");
  CREATE INDEX "home_selected_work_order_idx" ON "home_selected_work" USING btree ("_order");
  CREATE INDEX "home_selected_work_parent_id_idx" ON "home_selected_work" USING btree ("_parent_id");
  CREATE INDEX "home_brands_order_idx" ON "home_brands" USING btree ("_order");
  CREATE INDEX "home_brands_parent_id_idx" ON "home_brands" USING btree ("_parent_id");
  CREATE INDEX "home_brands_logo_idx" ON "home_brands" USING btree ("logo_id");
  CREATE INDEX "home_hero_video_hero_video_mp4_idx" ON "home" USING btree ("hero_video_mp4_id");
  CREATE INDEX "home_hero_video_hero_video_webm_idx" ON "home" USING btree ("hero_video_webm_id");
  CREATE INDEX "home_hero_video_hero_video_poster_idx" ON "home" USING btree ("hero_video_poster_id");
  CREATE INDEX "home_photo_idx" ON "home" USING btree ("photo_id");
  CREATE INDEX "home_featured_video_featured_video_mp4_idx" ON "home" USING btree ("featured_video_mp4_id");
  CREATE INDEX "home_featured_video_featured_video_webm_idx" ON "home" USING btree ("featured_video_webm_id");
  CREATE INDEX "home_featured_video_featured_video_poster_idx" ON "home" USING btree ("featured_video_poster_id");
  CREATE INDEX "home_web_video_top_web_video_top_mp4_idx" ON "home" USING btree ("web_video_top_mp4_id");
  CREATE INDEX "home_web_video_top_web_video_top_webm_idx" ON "home" USING btree ("web_video_top_webm_id");
  CREATE INDEX "home_web_video_top_web_video_top_poster_idx" ON "home" USING btree ("web_video_top_poster_id");
  CREATE INDEX "home_web_video_bottom_web_video_bottom_mp4_idx" ON "home" USING btree ("web_video_bottom_mp4_id");
  CREATE INDEX "home_web_video_bottom_web_video_bottom_webm_idx" ON "home" USING btree ("web_video_bottom_webm_id");
  CREATE INDEX "home_web_video_bottom_web_video_bottom_poster_idx" ON "home" USING btree ("web_video_bottom_poster_id");
  CREATE INDEX "home_meta_meta_image_idx" ON "home" USING btree ("meta_image_id");
  CREATE INDEX "home_rels_order_idx" ON "home_rels" USING btree ("order");
  CREATE INDEX "home_rels_parent_idx" ON "home_rels" USING btree ("parent_id");
  CREATE INDEX "home_rels_path_idx" ON "home_rels" USING btree ("path");
  CREATE INDEX "home_rels_projects_id_idx" ON "home_rels" USING btree ("projects_id");
  CREATE INDEX "about_photo_idx" ON "about" USING btree ("photo_id");
  CREATE INDEX "about_timeline_desktop_idx" ON "about" USING btree ("timeline_desktop_id");
  CREATE INDEX "about_timeline_mobile_idx" ON "about" USING btree ("timeline_mobile_id");
  CREATE INDEX "about_meta_meta_image_idx" ON "about" USING btree ("meta_image_id");
  CREATE INDEX "contact_meta_meta_image_idx" ON "contact" USING btree ("meta_image_id");
  CREATE INDEX "site_settings_nav_order_idx" ON "site_settings_nav" USING btree ("_order");
  CREATE INDEX "site_settings_nav_parent_id_idx" ON "site_settings_nav" USING btree ("_parent_id");
  CREATE INDEX "site_settings_social_order_idx" ON "site_settings_social" USING btree ("_order");
  CREATE INDEX "site_settings_social_parent_id_idx" ON "site_settings_social" USING btree ("_parent_id");
  CREATE INDEX "site_settings_social_icon_idx" ON "site_settings_social" USING btree ("icon_id");
  CREATE INDEX "site_settings_logo_idx" ON "site_settings" USING btree ("logo_id");
  CREATE INDEX "site_settings_logo_hover_idx" ON "site_settings" USING btree ("logo_hover_id");
  CREATE INDEX "site_settings_default_og_image_idx" ON "site_settings" USING btree ("default_og_image_id");
  CREATE INDEX "site_settings_favicon_idx" ON "site_settings" USING btree ("favicon_id");
  CREATE INDEX "site_settings_apple_touch_icon_idx" ON "site_settings" USING btree ("apple_touch_icon_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "projects_blocks_image" CASCADE;
  DROP TABLE "projects_blocks_two_up" CASCADE;
  DROP TABLE "projects_blocks_grid_images" CASCADE;
  DROP TABLE "projects_blocks_grid" CASCADE;
  DROP TABLE "projects_blocks_text" CASCADE;
  DROP TABLE "projects_blocks_columns" CASCADE;
  DROP TABLE "projects_blocks_video" CASCADE;
  DROP TABLE "projects_blocks_lottie" CASCADE;
  DROP TABLE "projects_blocks_section_rows" CASCADE;
  DROP TABLE "projects_blocks_section" CASCADE;
  DROP TABLE "projects" CASCADE;
  DROP TABLE "_projects_v_blocks_image" CASCADE;
  DROP TABLE "_projects_v_blocks_two_up" CASCADE;
  DROP TABLE "_projects_v_blocks_grid_images" CASCADE;
  DROP TABLE "_projects_v_blocks_grid" CASCADE;
  DROP TABLE "_projects_v_blocks_text" CASCADE;
  DROP TABLE "_projects_v_blocks_columns" CASCADE;
  DROP TABLE "_projects_v_blocks_video" CASCADE;
  DROP TABLE "_projects_v_blocks_lottie" CASCADE;
  DROP TABLE "_projects_v_blocks_section_rows" CASCADE;
  DROP TABLE "_projects_v_blocks_section" CASCADE;
  DROP TABLE "_projects_v" CASCADE;
  DROP TABLE "works_gallery" CASCADE;
  DROP TABLE "works" CASCADE;
  DROP TABLE "_works_v_version_gallery" CASCADE;
  DROP TABLE "_works_v" CASCADE;
  DROP TABLE "redirects" CASCADE;
  DROP TABLE "redirects_rels" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "home_worked_with" CASCADE;
  DROP TABLE "home_skills" CASCADE;
  DROP TABLE "home_selected_work" CASCADE;
  DROP TABLE "home_brands" CASCADE;
  DROP TABLE "home" CASCADE;
  DROP TABLE "home_rels" CASCADE;
  DROP TABLE "about" CASCADE;
  DROP TABLE "contact" CASCADE;
  DROP TABLE "site_settings_nav" CASCADE;
  DROP TABLE "site_settings_social" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TYPE "public"."enum_projects_blocks_image_width";
  DROP TYPE "public"."enum_projects_blocks_two_up_left_kind";
  DROP TYPE "public"."enum_projects_blocks_two_up_left_width";
  DROP TYPE "public"."enum_projects_blocks_two_up_right_kind";
  DROP TYPE "public"."enum_projects_blocks_two_up_right_width";
  DROP TYPE "public"."enum_projects_blocks_grid_columns";
  DROP TYPE "public"."enum_projects_blocks_columns_heading_size";
  DROP TYPE "public"."enum_projects_blocks_columns_left_image_width";
  DROP TYPE "public"."enum_projects_blocks_columns_media_kind";
  DROP TYPE "public"."enum_projects_blocks_columns_media_width";
  DROP TYPE "public"."enum_projects_blocks_video_size";
  DROP TYPE "public"."enum_projects_blocks_lottie_width";
  DROP TYPE "public"."enum_projects_blocks_section_rows_wrapper";
  DROP TYPE "public"."enum_projects_blocks_section_background";
  DROP TYPE "public"."enum_projects_blocks_section_padding";
  DROP TYPE "public"."enum_projects_hero_kind";
  DROP TYPE "public"."enum_projects_hero_variant";
  DROP TYPE "public"."enum_projects_status";
  DROP TYPE "public"."enum__projects_v_blocks_image_width";
  DROP TYPE "public"."enum__projects_v_blocks_two_up_left_kind";
  DROP TYPE "public"."enum__projects_v_blocks_two_up_left_width";
  DROP TYPE "public"."enum__projects_v_blocks_two_up_right_kind";
  DROP TYPE "public"."enum__projects_v_blocks_two_up_right_width";
  DROP TYPE "public"."enum__projects_v_blocks_grid_columns";
  DROP TYPE "public"."enum__projects_v_blocks_columns_heading_size";
  DROP TYPE "public"."enum__projects_v_blocks_columns_left_image_width";
  DROP TYPE "public"."enum__projects_v_blocks_columns_media_kind";
  DROP TYPE "public"."enum__projects_v_blocks_columns_media_width";
  DROP TYPE "public"."enum__projects_v_blocks_video_size";
  DROP TYPE "public"."enum__projects_v_blocks_lottie_width";
  DROP TYPE "public"."enum__projects_v_blocks_section_rows_wrapper";
  DROP TYPE "public"."enum__projects_v_blocks_section_background";
  DROP TYPE "public"."enum__projects_v_blocks_section_padding";
  DROP TYPE "public"."enum__projects_v_version_hero_kind";
  DROP TYPE "public"."enum__projects_v_version_hero_variant";
  DROP TYPE "public"."enum__projects_v_version_status";
  DROP TYPE "public"."enum_works_status";
  DROP TYPE "public"."enum__works_v_version_status";
  DROP TYPE "public"."enum_redirects_to_type";`)
}
