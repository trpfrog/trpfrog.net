CREATE TABLE `images_metadata` (
	`id` text PRIMARY KEY NOT NULL,
	`author` text NOT NULL,
	`prompt_text` text NOT NULL,
	`prompt_translated` text NOT NULL,
	`model_name` text NOT NULL,
	`created_at_millis` integer NOT NULL,
	`image_uri` text NOT NULL
);
