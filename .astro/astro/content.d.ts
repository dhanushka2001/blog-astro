declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"posts": {
"Thoughts_after_using_dotnet_interactive.md": {
	id: "Thoughts_after_using_dotnet_interactive.md";
  slug: "thoughts_after_using_dotnet_interactive";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"adding_search_to_static_sites.md": {
	id: "adding_search_to_static_sites.md";
  slug: "adding_search_to_static_sites";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"adding_tagging_to_astro.md": {
	id: "adding_tagging_to_astro.md";
  slug: "adding_tagging_to_astro";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"attempting_to_sell_dall-e_images.md": {
	id: "attempting_to_sell_dall-e_images.md";
  slug: "attempting_to_sell_dall-e_images";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"bintray_removed_approaches.md": {
	id: "bintray_removed_approaches.md";
  slug: "bintray_removed_approaches";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"building_ticker_app_with_plotly_dash.md": {
	id: "building_ticker_app_with_plotly_dash.md";
  slug: "building_ticker_app_with_plotly_dash";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"consuming_twilio_media.md": {
	id: "consuming_twilio_media.md";
  slug: "consuming_twilio_media";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"creating_vuepress_theme.md": {
	id: "creating_vuepress_theme.md";
  slug: "creating_vuepress_theme";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"dall_e_experimentation_with_corgis.md": {
	id: "dall_e_experimentation_with_corgis.md";
  slug: "dall_e_experimentation_with_corgis";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"docker_hub_to_github_packages.md": {
	id: "docker_hub_to_github_packages.md";
  slug: "docker_hub_to_github_packages";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"extracting_types_from_openapi.md": {
	id: "extracting_types_from_openapi.md";
  slug: "extracting_types_from_openapi";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"flipp_grocery_scrapper.md": {
	id: "flipp_grocery_scrapper.md";
  slug: "flipp_grocery_scrapper";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"heroku_shutdown_migrate_to_koyeb.md": {
	id: "heroku_shutdown_migrate_to_koyeb.md";
  slug: "heroku_shutdown_migrate_to_koyeb";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"how_to_make_show_more_component_in_react.md": {
	id: "how_to_make_show_more_component_in_react.md";
  slug: "how_to_make_show_more_component_in_react";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"install_wsl2_on_windows.md": {
	id: "install_wsl2_on_windows.md";
  slug: "install_wsl2_on_windows";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"introduction_to_flutter.md": {
	id: "introduction_to_flutter.md";
  slug: "introduction_to_flutter";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"lib_became_open_source.md": {
	id: "lib_became_open_source.md";
  slug: "lib_became_open_source";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"microservices_on_gae_shoestring_budget_20201128.md": {
	id: "microservices_on_gae_shoestring_budget_20201128.md";
  slug: "microservices_on_gae_shoestring_budget_20201128";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"random/free_education_software_development.md": {
	id: "random/free_education_software_development.md";
  slug: "random/free_education_software_development";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"random/linkedin_auto_suggestions.md": {
	id: "random/linkedin_auto_suggestions.md";
  slug: "random/linkedin_auto_suggestions";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"random/pikachu_bobble_head.md": {
	id: "random/pikachu_bobble_head.md";
  slug: "random/pikachu_bobble_head";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"random/practise_for_tech_interview.md": {
	id: "random/practise_for_tech_interview.md";
  slug: "random/practise_for_tech_interview";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"random/tech_layoffs.md": {
	id: "random/tech_layoffs.md";
  slug: "random/tech_layoffs";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"remove_background_from_image.md": {
	id: "remove_background_from_image.md";
  slug: "remove_background_from_image";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"remove_background_from_image_II.md": {
	id: "remove_background_from_image_II.md";
  slug: "remove_background_from_image_ii";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"remove_background_from_image_III.md": {
	id: "remove_background_from_image_III.md";
  slug: "remove_background_from_image_iii";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"stonks/Converting_from_streamlit_to_dash_with_binggpt.md": {
	id: "stonks/Converting_from_streamlit_to_dash_with_binggpt.md";
  slug: "stonks/converting_from_streamlit_to_dash_with_binggpt";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"stonks/build_dashboard_with_openbb.md": {
	id: "stonks/build_dashboard_with_openbb.md";
  slug: "stonks/build_dashboard_with_openbb";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"stonks/build_dashboard_with_openbb_II.md": {
	id: "stonks/build_dashboard_with_openbb_II.md";
  slug: "stonks/build_dashboard_with_openbb_ii";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"stonks/conscrap_2.0.0_release.md": {
	id: "stonks/conscrap_2.0.0_release.md";
  slug: "stonks/conscrap_200_release";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"stonks/get_transcript_of_youtube_livestreams_part_one.md": {
	id: "stonks/get_transcript_of_youtube_livestreams_part_one.md";
  slug: "stonks/get_transcript_of_youtube_livestreams_part_one";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"stonks/get_transcript_of_youtube_livestreams_part_two.md": {
	id: "stonks/get_transcript_of_youtube_livestreams_part_two.md";
  slug: "stonks/get_transcript_of_youtube_livestreams_part_two";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"stonks/getting_started_with_cad_tickers.md": {
	id: "stonks/getting_started_with_cad_tickers.md";
  slug: "stonks/getting_started_with_cad_tickers";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"stonks/gradio_ui_for_nlp_stonks.md": {
	id: "stonks/gradio_ui_for_nlp_stonks.md";
  slug: "stonks/gradio_ui_for_nlp_stonks";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"stonks/rbc_stock_trade_analyzer.md": {
	id: "stonks/rbc_stock_trade_analyzer.md";
  slug: "stonks/rbc_stock_trade_analyzer";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"stonks/scrapping_comments_from_yahoo_finance.md": {
	id: "stonks/scrapping_comments_from_yahoo_finance.md";
  slug: "stonks/scrapping_comments_from_yahoo_finance";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"stonks/scrapping_comments_from_yahoo_finance_II.md": {
	id: "stonks/scrapping_comments_from_yahoo_finance_II.md";
  slug: "stonks/scrapping_comments_from_yahoo_finance_ii";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"stonks/stock_dashboard_ta.md": {
	id: "stonks/stock_dashboard_ta.md";
  slug: "stonks/stock_dashboard_ta";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"stonks/ta/natural_gas_ta_with_python.md": {
	id: "stonks/ta/natural_gas_ta_with_python.md";
  slug: "stonks/ta/natural_gas_ta_with_python";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"stonks/ta/stonk_screener_part_I.md": {
	id: "stonks/ta/stonk_screener_part_I.md";
  slug: "stonks/ta/stonk_screener_part_i";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"stonks/ta/stonk_screener_part_II.md": {
	id: "stonks/ta/stonk_screener_part_II.md";
  slug: "stonks/ta/stonk_screener_part_ii";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"stonks/thoughts/credit_suisse_failings.md": {
	id: "stonks/thoughts/credit_suisse_failings.md";
  slug: "stonks/thoughts/credit_suisse_failings";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"stonks/thoughts/why_I_am_buying_sqqq.md": {
	id: "stonks/thoughts/why_I_am_buying_sqqq.md";
  slug: "stonks/thoughts/why_i_am_buying_sqqq";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"stonks/web/generate_reports_with_13F_filings_with_markdown.md": {
	id: "stonks/web/generate_reports_with_13F_filings_with_markdown.md";
  slug: "stonks/web/generate_reports_with_13f_filings_with_markdown";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"stonks/web/generating_stonk_reports_with_python.md": {
	id: "stonks/web/generating_stonk_reports_with_python.md";
  slug: "stonks/web/generating_stonk_reports_with_python";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"stonks/web/ldi_diagram_in_tex.md": {
	id: "stonks/web/ldi_diagram_in_tex.md";
  slug: "stonks/web/ldi_diagram_in_tex";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"stonks/web/scrap_from_sec_with_python.md": {
	id: "stonks/web/scrap_from_sec_with_python.md";
  slug: "stonks/web/scrap_from_sec_with_python";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"stonks/web/scrapping_comments_from_reddit.md": {
	id: "stonks/web/scrapping_comments_from_reddit.md";
  slug: "stonks/web/scrapping_comments_from_reddit";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"stonks/web/scrapping_tables_with_pandas.md": {
	id: "stonks/web/scrapping_tables_with_pandas.md";
  slug: "stonks/web/scrapping_tables_with_pandas";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"stonks/web/use_openbb_251_to_summarize_youtube_vids.md": {
	id: "stonks/web/use_openbb_251_to_summarize_youtube_vids.md";
  slug: "stonks/web/use_openbb_251_to_summarize_youtube_vids";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"stonks/web_app_to_transcribe_audio.md": {
	id: "stonks/web_app_to_transcribe_audio.md";
  slug: "stonks/web_app_to_transcribe_audio";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/A_Comprehensive_Guide_to_C++_Debugging_and_Profiling_Tools.md": {
	id: "tech/2023/A_Comprehensive_Guide_to_C++_Debugging_and_Profiling_Tools.md";
  slug: "tech/2023/a_comprehensive_guide_to_c_debugging_and_profiling_tools";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/A_Comprehensive_Guide_to_Data_Visualization_with_Seaborn_in_Python.md": {
	id: "tech/2023/A_Comprehensive_Guide_to_Data_Visualization_with_Seaborn_in_Python.md";
  slug: "tech/2023/a_comprehensive_guide_to_data_visualization_with_seaborn_in_python";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/A_Comprehensive_Guide_to_Newtonsoft.Json.md": {
	id: "tech/2023/A_Comprehensive_Guide_to_Newtonsoft.Json.md";
  slug: "tech/2023/a_comprehensive_guide_to_newtonsoftjson";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/A_Comprehensive_Guide_to_Pytest_in_Python.md": {
	id: "tech/2023/A_Comprehensive_Guide_to_Pytest_in_Python.md";
  slug: "tech/2023/a_comprehensive_guide_to_pytest_in_python";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/A_Comprehensive_Guide_to_Using_Matplotlib_in_Python.md": {
	id: "tech/2023/A_Comprehensive_Guide_to_Using_Matplotlib_in_Python.md";
  slug: "tech/2023/a_comprehensive_guide_to_using_matplotlib_in_python";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/A_Deep_Dive_into_Dapper_ORM_A_High-Performance_Micro-ORM_for_.NET.md": {
	id: "tech/2023/A_Deep_Dive_into_Dapper_ORM_A_High-Performance_Micro-ORM_for_.NET.md";
  slug: "tech/2023/a_deep_dive_into_dapper_orm_a_high-performance_micro-orm_for_net";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/A_Deep_Dive_into_Entity_Framework.md": {
	id: "tech/2023/A_Deep_Dive_into_Entity_Framework.md";
  slug: "tech/2023/a_deep_dive_into_entity_framework";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/A_Dive_into_Rust's_String_Manipulation_Libraries_for_Text_Processing.md": {
	id: "tech/2023/A_Dive_into_Rust's_String_Manipulation_Libraries_for_Text_Processing.md";
  slug: "tech/2023/a_dive_into_rusts_string_manipulation_libraries_for_text_processing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/A_Guide_to_Using_Python-telegram-bot_in_Python.md": {
	id: "tech/2023/A_Guide_to_Using_Python-telegram-bot_in_Python.md";
  slug: "tech/2023/a_guide_to_using_python-telegram-bot_in_python";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/A_Practical_Guide_to_Unit_Testing_in_Swift.md": {
	id: "tech/2023/A_Practical_Guide_to_Unit_Testing_in_Swift.md";
  slug: "tech/2023/a_practical_guide_to_unit_testing_in_swift";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/An_In-Depth_Look_at_the_Android_Standard_Library.md": {
	id: "tech/2023/An_In-Depth_Look_at_the_Android_Standard_Library.md";
  slug: "tech/2023/an_in-depth_look_at_the_android_standard_library";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/An_In-depth_Look_at_the_Android_Google_Analytics_SDK.md": {
	id: "tech/2023/An_In-depth_Look_at_the_Android_Google_Analytics_SDK.md";
  slug: "tech/2023/an_in-depth_look_at_the_android_google_analytics_sdk";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/An_Introduction_to_ASP.NET_A_Powerful_Web_Development_Framework.md": {
	id: "tech/2023/An_Introduction_to_ASP.NET_A_Powerful_Web_Development_Framework.md";
  slug: "tech/2023/an_introduction_to_aspnet_a_powerful_web_development_framework";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/An_Introduction_to_Flask_A_Lightweight_Web_Framework_for_Python.md": {
	id: "tech/2023/An_Introduction_to_Flask_A_Lightweight_Web_Framework_for_Python.md";
  slug: "tech/2023/an_introduction_to_flask_a_lightweight_web_framework_for_python";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/An_Introduction_to_NUnit_Testing_Framework.md": {
	id: "tech/2023/An_Introduction_to_NUnit_Testing_Framework.md";
  slug: "tech/2023/an_introduction_to_nunit_testing_framework";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/An_Introduction_to_Pygame_Zero_Building_Your_First_Game_in_Python.md": {
	id: "tech/2023/An_Introduction_to_Pygame_Zero_Building_Your_First_Game_in_Python.md";
  slug: "tech/2023/an_introduction_to_pygame_zero_building_your_first_game_in_python";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/An_Introduction_to_the_Android_RxJava_Reactive_Extensions_Library.md": {
	id: "tech/2023/An_Introduction_to_the_Android_RxJava_Reactive_Extensions_Library.md";
  slug: "tech/2023/an_introduction_to_the_android_rxjava_reactive_extensions_library";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/An_Introduction_to_the_Deno_Crypto_Module.md": {
	id: "tech/2023/An_Introduction_to_the_Deno_Crypto_Module.md";
  slug: "tech/2023/an_introduction_to_the_deno_crypto_module";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/An_Introduction_to_the_Spring_Framework.md": {
	id: "tech/2023/An_Introduction_to_the_Spring_Framework.md";
  slug: "tech/2023/an_introduction_to_the_spring_framework";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Android_Architecture_Components_A_Comprehensive_Overview.md": {
	id: "tech/2023/Android_Architecture_Components_A_Comprehensive_Overview.md";
  slug: "tech/2023/android_architecture_components_a_comprehensive_overview";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Android_ButterKnife_View_Binding_Library_A_Comprehensive_Overview.md": {
	id: "tech/2023/Android_ButterKnife_View_Binding_Library_A_Comprehensive_Overview.md";
  slug: "tech/2023/android_butterknife_view_binding_library_a_comprehensive_overview";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Android_Dagger_Dependency_Injection_Framework_An_In-Depth_Overview.md": {
	id: "tech/2023/Android_Dagger_Dependency_Injection_Framework_An_In-Depth_Overview.md";
  slug: "tech/2023/android_dagger_dependency_injection_framework_an_in-depth_overview";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Android_Espresso_Testing_Framework_An_In-Depth_Guide.md": {
	id: "tech/2023/Android_Espresso_Testing_Framework_An_In-Depth_Guide.md";
  slug: "tech/2023/android_espresso_testing_framework_an_in-depth_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Android_ExoPlayer_A_Powerful_and_Customizable_Media_Player.md": {
	id: "tech/2023/Android_ExoPlayer_A_Powerful_and_Customizable_Media_Player.md";
  slug: "tech/2023/android_exoplayer_a_powerful_and_customizable_media_player";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Android_Firebase_Realtime_Database_A_Comprehensive_Guide.md": {
	id: "tech/2023/Android_Firebase_Realtime_Database_A_Comprehensive_Guide.md";
  slug: "tech/2023/android_firebase_realtime_database_a_comprehensive_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Android_Glide_Image_Loading_Library_A_Comprehensive_Guide.md": {
	id: "tech/2023/Android_Glide_Image_Loading_Library_A_Comprehensive_Guide.md";
  slug: "tech/2023/android_glide_image_loading_library_a_comprehensive_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Android_Jetpack_Navigation_Component_A_Comprehensive_Guide.md": {
	id: "tech/2023/Android_Jetpack_Navigation_Component_A_Comprehensive_Guide.md";
  slug: "tech/2023/android_jetpack_navigation_component_a_comprehensive_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Android_Material_Design_Components_A_Comprehensive_Guide.md": {
	id: "tech/2023/Android_Material_Design_Components_A_Comprehensive_Guide.md";
  slug: "tech/2023/android_material_design_components_a_comprehensive_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Android_Mockito_Mocking_Framework_A_Comprehensive_Overview.md": {
	id: "tech/2023/Android_Mockito_Mocking_Framework_A_Comprehensive_Overview.md";
  slug: "tech/2023/android_mockito_mocking_framework_a_comprehensive_overview";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Android_OkHttp_Networking_Library_An_In-Depth_Guide.md": {
	id: "tech/2023/Android_OkHttp_Networking_Library_An_In-Depth_Guide.md";
  slug: "tech/2023/android_okhttp_networking_library_an_in-depth_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Android_Picasso_Image_Loading_Library_An_Overview.md": {
	id: "tech/2023/Android_Picasso_Image_Loading_Library_An_Overview.md";
  slug: "tech/2023/android_picasso_image_loading_library_an_overview";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Android_Room_Persistence_Library_A_Comprehensive_Guide.md": {
	id: "tech/2023/Android_Room_Persistence_Library_A_Comprehensive_Guide.md";
  slug: "tech/2023/android_room_persistence_library_a_comprehensive_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Apache_Commons_A_Deep_Dive_into_the_Essential_Java_Libraries.md": {
	id: "tech/2023/Apache_Commons_A_Deep_Dive_into_the_Essential_Java_Libraries.md";
  slug: "tech/2023/apache_commons_a_deep_dive_into_the_essential_java_libraries";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Apache_Kafka_An_Introduction_to_Distributed_Streaming.md": {
	id: "tech/2023/Apache_Kafka_An_Introduction_to_Distributed_Streaming.md";
  slug: "tech/2023/apache_kafka_an_introduction_to_distributed_streaming";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Apache_Lucene_A_Comprehensive_Guide_to_the_World-class_Search_Library.md": {
	id: "tech/2023/Apache_Lucene_A_Comprehensive_Guide_to_the_World-class_Search_Library.md";
  slug: "tech/2023/apache_lucene_a_comprehensive_guide_to_the_world-class_search_library";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Apache_Maven_Unleashing_the_Power_of_Build_Automation.md": {
	id: "tech/2023/Apache_Maven_Unleashing_the_Power_of_Build_Automation.md";
  slug: "tech/2023/apache_maven_unleashing_the_power_of_build_automation";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Apache_POI_A_Comprehensive_Guide_to_Interacting_with_Microsoft_Office_Files_in_Java.md": {
	id: "tech/2023/Apache_POI_A_Comprehensive_Guide_to_Interacting_with_Microsoft_Office_Files_in_Java.md";
  slug: "tech/2023/apache_poi_a_comprehensive_guide_to_interacting_with_microsoft_office_files_in_java";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Apache_Spark_A_High-Performance_Cluster-Computing_Framework.md": {
	id: "tech/2023/Apache_Spark_A_High-Performance_Cluster-Computing_Framework.md";
  slug: "tech/2023/apache_spark_a_high-performance_cluster-computing_framework";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Apache_Struts_An_Overview_and_Best_Practices_for_Web_Application_Development.md": {
	id: "tech/2023/Apache_Struts_An_Overview_and_Best_Practices_for_Web_Application_Development.md";
  slug: "tech/2023/apache_struts_an_overview_and_best_practices_for_web_application_development";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Apache_Thrift_A_Comprehensive_Introduction_to_Cross-Language_Service_Development.md": {
	id: "tech/2023/Apache_Thrift_A_Comprehensive_Introduction_to_Cross-Language_Service_Development.md";
  slug: "tech/2023/apache_thrift_a_comprehensive_introduction_to_cross-language_service_development";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Apache_Tomcat_A_Comprehensive_Guide.md": {
	id: "tech/2023/Apache_Tomcat_A_Comprehensive_Guide.md";
  slug: "tech/2023/apache_tomcat_a_comprehensive_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Automating_GUI_Interactions_with_Python_Using_PyAutoGUI.md": {
	id: "tech/2023/Automating_GUI_Interactions_with_Python_Using_PyAutoGUI.md";
  slug: "tech/2023/automating_gui_interactions_with_python_using_pyautogui";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Best_Practices_for_Writing_Swift_Packages.md": {
	id: "tech/2023/Best_Practices_for_Writing_Swift_Packages.md";
  slug: "tech/2023/best_practices_for_writing_swift_packages";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Building_Cross-Platform_Desktop_Applications_with_WebAssembly.md": {
	id: "tech/2023/Building_Cross-Platform_Desktop_Applications_with_WebAssembly.md";
  slug: "tech/2023/building_cross-platform_desktop_applications_with_webassembly";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Building_Decentralized_Applications_with_WebAssembly.md": {
	id: "tech/2023/Building_Decentralized_Applications_with_WebAssembly.md";
  slug: "tech/2023/building_decentralized_applications_with_webassembly";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Building_Fast_and_Efficient_Web_APIs_with_FastAPI_in_Python.md": {
	id: "tech/2023/Building_Fast_and_Efficient_Web_APIs_with_FastAPI_in_Python.md";
  slug: "tech/2023/building_fast_and_efficient_web_apis_with_fastapi_in_python";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Building_Microservices_with_Go-Kit_in_Golang.md": {
	id: "tech/2023/Building_Microservices_with_Go-Kit_in_Golang.md";
  slug: "tech/2023/building_microservices_with_go-kit_in_golang";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Building_Microservices_with_Go-Micro_in_Golang.md": {
	id: "tech/2023/Building_Microservices_with_Go-Micro_in_Golang.md";
  slug: "tech/2023/building_microservices_with_go-micro_in_golang";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Building_RESTful_APIs_with_Flask-RESTful_in_Python.md": {
	id: "tech/2023/Building_RESTful_APIs_with_Flask-RESTful_in_Python.md";
  slug: "tech/2023/building_restful_apis_with_flask-restful_in_python";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Building_and_Packaging_Rust_Applications_with_Rust's_Build_Tools.md": {
	id: "tech/2023/Building_and_Packaging_Rust_Applications_with_Rust's_Build_Tools.md";
  slug: "tech/2023/building_and_packaging_rust_applications_with_rusts_build_tools";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/C++_Exceptions_and_Error_Handling_A_Comprehensive_Guide.md": {
	id: "tech/2023/C++_Exceptions_and_Error_Handling_A_Comprehensive_Guide.md";
  slug: "tech/2023/c_exceptions_and_error_handling_a_comprehensive_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/C++_Function_Objects_and_Functors_A_Comprehensive_Guide.md": {
	id: "tech/2023/C++_Function_Objects_and_Functors_A_Comprehensive_Guide.md";
  slug: "tech/2023/c_function_objects_and_functors_a_comprehensive_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/C++_Interoperability_with_Other_Languages.md": {
	id: "tech/2023/C++_Interoperability_with_Other_Languages.md";
  slug: "tech/2023/c_interoperability_with_other_languages";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/C++_Libraries_for_Scientific_Computing_An_Overview.md": {
	id: "tech/2023/C++_Libraries_for_Scientific_Computing_An_Overview.md";
  slug: "tech/2023/c_libraries_for_scientific_computing_an_overview";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/C++_Memory_Management_and_Smart_Pointers.md": {
	id: "tech/2023/C++_Memory_Management_and_Smart_Pointers.md";
  slug: "tech/2023/c_memory_management_and_smart_pointers";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/C++_Modern_Features_From_C++11_to_C++20.md": {
	id: "tech/2023/C++_Modern_Features_From_C++11_to_C++20.md";
  slug: "tech/2023/c_modern_features_from_c11_to_c20";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/C++_Move_Semantics_and_Rvalue_References_A_Deep_Dive.md": {
	id: "tech/2023/C++_Move_Semantics_and_Rvalue_References_A_Deep_Dive.md";
  slug: "tech/2023/c_move_semantics_and_rvalue_references_a_deep_dive";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/C++_Multithreading_and_Concurrency_A_Comprehensive_Guide.md": {
	id: "tech/2023/C++_Multithreading_and_Concurrency_A_Comprehensive_Guide.md";
  slug: "tech/2023/c_multithreading_and_concurrency_a_comprehensive_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/C++_Object-Oriented_Design_Patterns_A_Practical_Guide.md": {
	id: "tech/2023/C++_Object-Oriented_Design_Patterns_A_Practical_Guide.md";
  slug: "tech/2023/c_object-oriented_design_patterns_a_practical_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/C++_Operator_Overloading_Enhancing_the_Power_of_User-Defined_Types.md": {
	id: "tech/2023/C++_Operator_Overloading_Enhancing_the_Power_of_User-Defined_Types.md";
  slug: "tech/2023/c_operator_overloading_enhancing_the_power_of_user-defined_types";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/C++_Performance_Optimization_Techniques.md": {
	id: "tech/2023/C++_Performance_Optimization_Techniques.md";
  slug: "tech/2023/c_performance_optimization_techniques";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/C++_Standard_Library_Algorithms_and_Containers.md": {
	id: "tech/2023/C++_Standard_Library_Algorithms_and_Containers.md";
  slug: "tech/2023/c_standard_library_algorithms_and_containers";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/C++_Templates_and_Generic_Programming_A_Deep_Dive.md": {
	id: "tech/2023/C++_Templates_and_Generic_Programming_A_Deep_Dive.md";
  slug: "tech/2023/c_templates_and_generic_programming_a_deep_dive";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/C++_Type_Traits_and_Metaprogramming_A_Deep_Dive.md": {
	id: "tech/2023/C++_Type_Traits_and_Metaprogramming_A_Deep_Dive.md";
  slug: "tech/2023/c_type_traits_and_metaprogramming_a_deep_dive";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/C++_Virtual_Functions_and_Polymorphism_A_Comprehensive_Guide.md": {
	id: "tech/2023/C++_Virtual_Functions_and_Polymorphism_A_Comprehensive_Guide.md";
  slug: "tech/2023/c_virtual_functions_and_polymorphism_a_comprehensive_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Contributing_to_Open-Source_Swift_Packages.md": {
	id: "tech/2023/Contributing_to_Open-Source_Swift_Packages.md";
  slug: "tech/2023/contributing_to_open-source_swift_packages";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Creating_a_Package_in_Swift.md": {
	id: "tech/2023/Creating_a_Package_in_Swift.md";
  slug: "tech/2023/creating_a_package_in_swift";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Debugging_Techniques_in_Swift.md": {
	id: "tech/2023/Debugging_Techniques_in_Swift.md";
  slug: "tech/2023/debugging_techniques_in_swift";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Demystifying_AutoMapper_Streamlining_Object-to-Object_Mapping_in_.NET.md": {
	id: "tech/2023/Demystifying_AutoMapper_Streamlining_Object-to-Object_Mapping_in_.NET.md";
  slug: "tech/2023/demystifying_automapper_streamlining_object-to-object_mapping_in_net";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Demystifying_C++_Lambda_Expressions.md": {
	id: "tech/2023/Demystifying_C++_Lambda_Expressions.md";
  slug: "tech/2023/demystifying_c_lambda_expressions";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Demystifying_Microsoft.AspNetCore.Authorization.md": {
	id: "tech/2023/Demystifying_Microsoft.AspNetCore.Authorization.md";
  slug: "tech/2023/demystifying_microsoftaspnetcoreauthorization";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Demystifying_Swift's_Optionals_A_Comprehensive_Guide.md": {
	id: "tech/2023/Demystifying_Swift's_Optionals_A_Comprehensive_Guide.md";
  slug: "tech/2023/demystifying_swifts_optionals_a_comprehensive_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Demystifying_the_Deno_Standard_Library.md": {
	id: "tech/2023/Demystifying_the_Deno_Standard_Library.md";
  slug: "tech/2023/demystifying_the_deno_standard_library";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Deno_Buffer_Module_A_Deep_Dive_into_Efficient_Data_Management.md": {
	id: "tech/2023/Deno_Buffer_Module_A_Deep_Dive_into_Efficient_Data_Management.md";
  slug: "tech/2023/deno_buffer_module_a_deep_dive_into_efficient_data_management";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Deno_CLI_Module_A_Modern_Approach_to_JavaScript_and_TypeScript_Development.md": {
	id: "tech/2023/Deno_CLI_Module_A_Modern_Approach_to_JavaScript_and_TypeScript_Development.md";
  slug: "tech/2023/deno_cli_module_a_modern_approach_to_javascript_and_typescript_development";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Deno_Fetch_Module_A_Deep_Dive_into_HTTP_Request_Handling.md": {
	id: "tech/2023/Deno_Fetch_Module_A_Deep_Dive_into_HTTP_Request_Handling.md";
  slug: "tech/2023/deno_fetch_module_a_deep_dive_into_http_request_handling";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Deno_HTTP_Module_A_Comprehensive_Overview.md": {
	id: "tech/2023/Deno_HTTP_Module_A_Comprehensive_Overview.md";
  slug: "tech/2023/deno_http_module_a_comprehensive_overview";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Deno_Testing_Module_A_Comprehensive_Guide.md": {
	id: "tech/2023/Deno_Testing_Module_A_Comprehensive_Guide.md";
  slug: "tech/2023/deno_testing_module_a_comprehensive_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Deno_WebSocket_Module_A_Comprehensive_Guide.md": {
	id: "tech/2023/Deno_WebSocket_Module_A_Comprehensive_Guide.md";
  slug: "tech/2023/deno_websocket_module_a_comprehensive_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Efficient_Memory_Management_with_Rust.md": {
	id: "tech/2023/Efficient_Memory_Management_with_Rust.md";
  slug: "tech/2023/efficient_memory_management_with_rust";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Embracing_Unsafe_Features_in_Rust_for_Low-Level_Code.md": {
	id: "tech/2023/Embracing_Unsafe_Features_in_Rust_for_Low-Level_Code.md";
  slug: "tech/2023/embracing_unsafe_features_in_rust_for_low-level_code";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Exploring_Rust's_Iterator_System_An_In-Depth_Guide.md": {
	id: "tech/2023/Exploring_Rust's_Iterator_System_An_In-Depth_Guide.md";
  slug: "tech/2023/exploring_rusts_iterator_system_an_in-depth_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Exploring_the_Android_Google_Places_API.md": {
	id: "tech/2023/Exploring_the_Android_Google_Places_API.md";
  slug: "tech/2023/exploring_the_android_google_places_api";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Exploring_the_Deno_Permissions_Module_A_Comprehensive_Guide.md": {
	id: "tech/2023/Exploring_the_Deno_Permissions_Module_A_Comprehensive_Guide.md";
  slug: "tech/2023/exploring_the_deno_permissions_module_a_comprehensive_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Functional_Programming_in_Swift.md": {
	id: "tech/2023/Functional_Programming_in_Swift.md";
  slug: "tech/2023/functional_programming_in_swift";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/GORM_An_Object-Relational_Mapping_Library_for_Go.md": {
	id: "tech/2023/GORM_An_Object-Relational_Mapping_Library_for_Go.md";
  slug: "tech/2023/gorm_an_object-relational_mapping_library_for_go";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Getting_Started_with_Python-Levenshtein_A_Comprehensive_Guide.md": {
	id: "tech/2023/Getting_Started_with_Python-Levenshtein_A_Comprehensive_Guide.md";
  slug: "tech/2023/getting_started_with_python-levenshtein_a_comprehensive_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Getting_Started_with_WebAssembly_A_Beginner's_Guide.md": {
	id: "tech/2023/Getting_Started_with_WebAssembly_A_Beginner's_Guide.md";
  slug: "tech/2023/getting_started_with_webassembly_a_beginners_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Google_Guava_A_Comprehensive_Guide_for_Java_Developers.md": {
	id: "tech/2023/Google_Guava_A_Comprehensive_Guide_for_Java_Developers.md";
  slug: "tech/2023/google_guava_a_comprehensive_guide_for_java_developers";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Google_Protocol_Buffers_An_Introduction_to_Efficient_Serialization.md": {
	id: "tech/2023/Google_Protocol_Buffers_An_Introduction_to_Efficient_Serialization.md";
  slug: "tech/2023/google_protocol_buffers_an_introduction_to_efficient_serialization";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Hangfire_Background_Processing_A_Comprehensive_Guide.md": {
	id: "tech/2023/Hangfire_Background_Processing_A_Comprehensive_Guide.md";
  slug: "tech/2023/hangfire_background_processing_a_comprehensive_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/How_to_Publish_a_Package_in_Swift.md": {
	id: "tech/2023/How_to_Publish_a_Package_in_Swift.md";
  slug: "tech/2023/how_to_publish_a_package_in_swift";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/How_to_Use_Popular_Swift_Packages_Alamofire,_RxSwift,_and_SwiftyJSON.md": {
	id: "tech/2023/How_to_Use_Popular_Swift_Packages_Alamofire,_RxSwift,_and_SwiftyJSON.md";
  slug: "tech/2023/how_to_use_popular_swift_packages_alamofire_rxswift_and_swiftyjson";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/How_to_Use_Swift_with_Xcode_A_Comprehensive_Guide.md": {
	id: "tech/2023/How_to_Use_Swift_with_Xcode_A_Comprehensive_Guide.md";
  slug: "tech/2023/how_to_use_swift_with_xcode_a_comprehensive_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/How_to_Use_the_Swift_Package_Manager.md": {
	id: "tech/2023/How_to_Use_the_Swift_Package_Manager.md";
  slug: "tech/2023/how_to_use_the_swift_package_manager";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Integrating_Google_Maps_API_in_Android_Applications.md": {
	id: "tech/2023/Integrating_Google_Maps_API_in_Android_Applications.md";
  slug: "tech/2023/integrating_google_maps_api_in_android_applications";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Interfacing_with_the_Kraken_API_in_Go.md": {
	id: "tech/2023/Interfacing_with_the_Kraken_API_in_Go.md";
  slug: "tech/2023/interfacing_with_the_kraken_api_in_go";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Introduction_to_Eclipse_Jetty_A_High-Performance_Web_Server_and_Servlet_Container.md": {
	id: "tech/2023/Introduction_to_Eclipse_Jetty_A_High-Performance_Web_Server_and_Servlet_Container.md";
  slug: "tech/2023/introduction_to_eclipse_jetty_a_high-performance_web_server_and_servlet_container";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Introduction_to_Log4j_A_Powerful_Java_Logging_Framework.md": {
	id: "tech/2023/Introduction_to_Log4j_A_Powerful_Java_Logging_Framework.md";
  slug: "tech/2023/introduction_to_log4j_a_powerful_java_logging_framework";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Introduction_to_Scikit-learn_A_Powerful_Python_Library_for_Machine_Learning.md": {
	id: "tech/2023/Introduction_to_Scikit-learn_A_Powerful_Python_Library_for_Machine_Learning.md";
  slug: "tech/2023/introduction_to_scikit-learn_a_powerful_python_library_for_machine_learning";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Introduction_to_SignalR_Real-Time_Web_Applications_Made_Easy.md": {
	id: "tech/2023/Introduction_to_SignalR_Real-Time_Web_Applications_Made_Easy.md";
  slug: "tech/2023/introduction_to_signalr_real-time_web_applications_made_easy";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Introduction_to_the_Android_Retrofit_Networking_Library.md": {
	id: "tech/2023/Introduction_to_the_Android_Retrofit_Networking_Library.md";
  slug: "tech/2023/introduction_to_the_android_retrofit_networking_library";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/JUnit_Testing_Framework_An_Introduction.md": {
	id: "tech/2023/JUnit_Testing_Framework_An_Introduction.md";
  slug: "tech/2023/junit_testing_framework_an_introduction";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Jackson_JSON_Library_An_Overview_and_Usage_Guide.md": {
	id: "tech/2023/Jackson_JSON_Library_An_Overview_and_Usage_Guide.md";
  slug: "tech/2023/jackson_json_library_an_overview_and_usage_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Java_Standard_Library_An_Overview.md": {
	id: "tech/2023/Java_Standard_Library_An_Overview.md";
  slug: "tech/2023/java_standard_library_an_overview";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Leveraging_Pandas_in_Python_for_Data_Manipulation.md": {
	id: "tech/2023/Leveraging_Pandas_in_Python_for_Data_Manipulation.md";
  slug: "tech/2023/leveraging_pandas_in_python_for_data_manipulation";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Leveraging_Rust's_Crate_Ecosystem_for_Third-Party_Libraries.md": {
	id: "tech/2023/Leveraging_Rust's_Crate_Ecosystem_for_Third-Party_Libraries.md";
  slug: "tech/2023/leveraging_rusts_crate_ecosystem_for_third-party_libraries";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Leveraging_Rust's_Trait_System_for_Writing_Generic_Code.md": {
	id: "tech/2023/Leveraging_Rust's_Trait_System_for_Writing_Generic_Code.md";
  slug: "tech/2023/leveraging_rusts_trait_system_for_writing_generic_code";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Leveraging_Rust's_Type_System_for_Safe_and_Efficient_Code.md": {
	id: "tech/2023/Leveraging_Rust's_Type_System_for_Safe_and_Efficient_Code.md";
  slug: "tech/2023/leveraging_rusts_type_system_for_safe_and_efficient_code";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Leveraging_WebAssembly_for_Augmented_and_Virtual_Reality.md": {
	id: "tech/2023/Leveraging_WebAssembly_for_Augmented_and_Virtual_Reality.md";
  slug: "tech/2023/leveraging_webassembly_for_augmented_and_virtual_reality";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Leveraging_WebAssembly_for_Game_Development.md": {
	id: "tech/2023/Leveraging_WebAssembly_for_Game_Development.md";
  slug: "tech/2023/leveraging_webassembly_for_game_development";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Making_custom_gpt_bots_with_openai.md": {
	id: "tech/2023/Making_custom_gpt_bots_with_openai.md";
  slug: "tech/2023/making_custom_gpt_bots_with_openai";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Managing_Python_Environments_with_Anaconda.md": {
	id: "tech/2023/Managing_Python_Environments_with_Anaconda.md";
  slug: "tech/2023/managing_python_environments_with_anaconda";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Managing_Rust_Projects_and_Dependencies_with_Cargo.md": {
	id: "tech/2023/Managing_Rust_Projects_and_Dependencies_with_Cargo.md";
  slug: "tech/2023/managing_rust_projects_and_dependencies_with_cargo";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Mastering_NumPy_A_Comprehensive_Guide_to_Efficient_Numerical_Computing_in_Python.md": {
	id: "tech/2023/Mastering_NumPy_A_Comprehensive_Guide_to_Efficient_Numerical_Computing_in_Python.md";
  slug: "tech/2023/mastering_numpy_a_comprehensive_guide_to_efficient_numerical_computing_in_python";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Mastering_Python_Development_with_PyCharm.md": {
	id: "tech/2023/Mastering_Python_Development_with_PyCharm.md";
  slug: "tech/2023/mastering_python_development_with_pycharm";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Microsoft.AspNetCore.Authentication_A_Deep_Dive_into_Authentication_Middleware.md": {
	id: "tech/2023/Microsoft.AspNetCore.Authentication_A_Deep_Dive_into_Authentication_Middleware.md";
  slug: "tech/2023/microsoftaspnetcoreauthentication_a_deep_dive_into_authentication_middleware";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Microsoft.AspNetCore.Mvc_An_Overview.md": {
	id: "tech/2023/Microsoft.AspNetCore.Mvc_An_Overview.md";
  slug: "tech/2023/microsoftaspnetcoremvc_an_overview";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Microsoft.Extensions.Logging_An_In-depth_Guide_to_Effective_Logging_in_.NET.md": {
	id: "tech/2023/Microsoft.Extensions.Logging_An_In-depth_Guide_to_Effective_Logging_in_.NET.md";
  slug: "tech/2023/microsoftextensionslogging_an_in-depth_guide_to_effective_logging_in_net";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Microsoft_Identity_A_Comprehensive_Guide_to_Secure_Authentication_and_Authorization.md": {
	id: "tech/2023/Microsoft_Identity_A_Comprehensive_Guide_to_Secure_Authentication_and_Authorization.md";
  slug: "tech/2023/microsoft_identity_a_comprehensive_guide_to_secure_authentication_and_authorization";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Monitoring_Golang_Applications_with_Prometheus.md": {
	id: "tech/2023/Monitoring_Golang_Applications_with_Prometheus.md";
  slug: "tech/2023/monitoring_golang_applications_with_prometheus";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Overview_of_Programming_and_Its_Importance.md": {
	id: "tech/2023/Overview_of_Programming_and_Its_Importance.md";
  slug: "tech/2023/overview_of_programming_and_its_importance";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Parsing_and_Manipulating_YAML_with_Deno's_YAML_Module.md": {
	id: "tech/2023/Parsing_and_Manipulating_YAML_with_Deno's_YAML_Module.md";
  slug: "tech/2023/parsing_and_manipulating_yaml_with_denos_yaml_module";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Pattern_Matching_with_Rust's_Regular_Expression_Libraries.md": {
	id: "tech/2023/Pattern_Matching_with_Rust's_Regular_Expression_Libraries.md";
  slug: "tech/2023/pattern_matching_with_rusts_regular_expression_libraries";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Pointers_and_References_in_C++_A_Comprehensive_Guide.md": {
	id: "tech/2023/Pointers_and_References_in_C++_A_Comprehensive_Guide.md";
  slug: "tech/2023/pointers_and_references_in_c_a_comprehensive_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Pros_and_Cons_of_Using_Swift_for_Mobile_App_Development.md": {
	id: "tech/2023/Pros_and_Cons_of_Using_Swift_for_Mobile_App_Development.md";
  slug: "tech/2023/pros_and_cons_of_using_swift_for_mobile_app_development";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Running_Python_Web_Applications_with_Gunicorn.md": {
	id: "tech/2023/Running_Python_Web_Applications_with_Gunicorn.md";
  slug: "tech/2023/running_python_web_applications_with_gunicorn";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Rust's_Concurrency_and_Parallelism_Libraries_A_Guide_to_Writing_Concurrent_and_Parallel_Code.md": {
	id: "tech/2023/Rust's_Concurrency_and_Parallelism_Libraries_A_Guide_to_Writing_Concurrent_and_Parallel_Code.md";
  slug: "tech/2023/rusts_concurrency_and_parallelism_libraries_a_guide_to_writing_concurrent_and_parallel_code";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Rust's_Match_Syntax_for_Pattern_Matching_A_Comprehensive_Guide.md": {
	id: "tech/2023/Rust's_Match_Syntax_for_Pattern_Matching_A_Comprehensive_Guide.md";
  slug: "tech/2023/rusts_match_syntax_for_pattern_matching_a_comprehensive_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Serilog_Logging_Framework_A_Comprehensive_Guide.md": {
	id: "tech/2023/Serilog_Logging_Framework_A_Comprehensive_Guide.md";
  slug: "tech/2023/serilog_logging_framework_a_comprehensive_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Speeding_Up_JavaScript_Applications_with_WebAssembly.md": {
	id: "tech/2023/Speeding_Up_JavaScript_Applications_with_WebAssembly.md";
  slug: "tech/2023/speeding_up_javascript_applications_with_webassembly";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Subscriptions_with_clover.md": {
	id: "tech/2023/Subscriptions_with_clover.md";
  slug: "tech/2023/subscriptions_with_clover";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Swift's_Concurrency_Features_A_Deep_Dive.md": {
	id: "tech/2023/Swift's_Concurrency_Features_A_Deep_Dive.md";
  slug: "tech/2023/swifts_concurrency_features_a_deep_dive";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Swift's_Extensions_Enhancing_the_Functionality_of_Existing_Types.md": {
	id: "tech/2023/Swift's_Extensions_Enhancing_the_Functionality_of_Existing_Types.md";
  slug: "tech/2023/swifts_extensions_enhancing_the_functionality_of_existing_types";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Swift's_Generics_Enhancing_Code_Flexibility_and_Reusability.md": {
	id: "tech/2023/Swift's_Generics_Enhancing_Code_Flexibility_and_Reusability.md";
  slug: "tech/2023/swifts_generics_enhancing_code_flexibility_and_reusability";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Swift's_Interoperability_with_Objective-C_Bridging_the_Gap.md": {
	id: "tech/2023/Swift's_Interoperability_with_Objective-C_Bridging_the_Gap.md";
  slug: "tech/2023/swifts_interoperability_with_objective-c_bridging_the_gap";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Swift's_Memory_Management_Understanding_ARC_and_Memory_Safety.md": {
	id: "tech/2023/Swift's_Memory_Management_Understanding_ARC_and_Memory_Safety.md";
  slug: "tech/2023/swifts_memory_management_understanding_arc_and_memory_safety";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Swift's_Operators_A_Comprehensive_Guide.md": {
	id: "tech/2023/Swift's_Operators_A_Comprehensive_Guide.md";
  slug: "tech/2023/swifts_operators_a_comprehensive_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Swift's_Protocols_Unleashing_the_Power_of_Flexibility_and_Reusability_in_Code.md": {
	id: "tech/2023/Swift's_Protocols_Unleashing_the_Power_of_Flexibility_and_Reusability_in_Code.md";
  slug: "tech/2023/swifts_protocols_unleashing_the_power_of_flexibility_and_reusability_in_code";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Swift's_Standard_Library_A_Deep_Dive.md": {
	id: "tech/2023/Swift's_Standard_Library_A_Deep_Dive.md";
  slug: "tech/2023/swifts_standard_library_a_deep_dive";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Swift_Enums_A_Powerful_and_Versatile_Tool_for_Developers.md": {
	id: "tech/2023/Swift_Enums_A_Powerful_and_Versatile_Tool_for_Developers.md";
  slug: "tech/2023/swift_enums_a_powerful_and_versatile_tool_for_developers";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Swift_Error_Handling_A_Comprehensive_Guide.md": {
	id: "tech/2023/Swift_Error_Handling_A_Comprehensive_Guide.md";
  slug: "tech/2023/swift_error_handling_a_comprehensive_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Swift_Performance_Optimization_Techniques.md": {
	id: "tech/2023/Swift_Performance_Optimization_Techniques.md";
  slug: "tech/2023/swift_performance_optimization_techniques";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Swift_Programming_Basics_A_Beginner's_Guide.md": {
	id: "tech/2023/Swift_Programming_Basics_A_Beginner's_Guide.md";
  slug: "tech/2023/swift_programming_basics_a_beginners_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Swift_and_C++_Interoperability_Bridging_the_Gap_Between_Two_Powerful_Languages.md": {
	id: "tech/2023/Swift_and_C++_Interoperability_Bridging_the_Gap_Between_Two_Powerful_Languages.md";
  slug: "tech/2023/swift_and_c_interoperability_bridging_the_gap_between_two_powerful_languages";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/The_Android_Support_Library_A_Comprehensive_Overview.md": {
	id: "tech/2023/The_Android_Support_Library_A_Comprehensive_Overview.md";
  slug: "tech/2023/the_android_support_library_a_comprehensive_overview";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/The_Benefits_of_Using_WebAssembly_for_Web_Development.md": {
	id: "tech/2023/The_Benefits_of_Using_WebAssembly_for_Web_Development.md";
  slug: "tech/2023/the_benefits_of_using_webassembly_for_web_development";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/The_Future_of_Swift_and_Its_Potential_Impact_on_the_Programming_World.md": {
	id: "tech/2023/The_Future_of_Swift_and_Its_Potential_Impact_on_the_Programming_World.md";
  slug: "tech/2023/the_future_of_swift_and_its_potential_impact_on_the_programming_world";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Top_C++_Libraries_for_Game_Development.md": {
	id: "tech/2023/Top_C++_Libraries_for_Game_Development.md";
  slug: "tech/2023/top_c_libraries_for_game_development";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Type_Casting_in_Swift_A_Technical_Dive.md": {
	id: "tech/2023/Type_Casting_in_Swift_A_Technical_Dive.md";
  slug: "tech/2023/type_casting_in_swift_a_technical_dive";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Understanding_Access_Control_in_Swift.md": {
	id: "tech/2023/Understanding_Access_Control_in_Swift.md";
  slug: "tech/2023/understanding_access_control_in_swift";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Understanding_Hibernate_ORM_A_Comprehensive_Guide.md": {
	id: "tech/2023/Understanding_Hibernate_ORM_A_Comprehensive_Guide.md";
  slug: "tech/2023/understanding_hibernate_orm_a_comprehensive_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Understanding_Microsoft.Extensions.Caching_A_Comprehensive_Guide.md": {
	id: "tech/2023/Understanding_Microsoft.Extensions.Caching_A_Comprehensive_Guide.md";
  slug: "tech/2023/understanding_microsoftextensionscaching_a_comprehensive_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Understanding_Microsoft.Extensions.Configuration_A_Comprehensive_Guide.md": {
	id: "tech/2023/Understanding_Microsoft.Extensions.Configuration_A_Comprehensive_Guide.md";
  slug: "tech/2023/understanding_microsoftextensionsconfiguration_a_comprehensive_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Understanding_Microsoft.Extensions.DependencyInjection_A_Deep_Dive.md": {
	id: "tech/2023/Understanding_Microsoft.Extensions.DependencyInjection_A_Deep_Dive.md";
  slug: "tech/2023/understanding_microsoftextensionsdependencyinjection_a_deep_dive";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Understanding_Swift's_Closures_A_Comprehensive_Guide.md": {
	id: "tech/2023/Understanding_Swift's_Closures_A_Comprehensive_Guide.md";
  slug: "tech/2023/understanding_swifts_closures_a_comprehensive_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Understanding_and_Implementing_Microsoft.AspNetCore.Cors.md": {
	id: "tech/2023/Understanding_and_Implementing_Microsoft.AspNetCore.Cors.md";
  slug: "tech/2023/understanding_and_implementing_microsoftaspnetcorecors";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Understanding_the_.NET_Core_Framework_A_Comprehensive_Overview.md": {
	id: "tech/2023/Understanding_the_.NET_Core_Framework_A_Comprehensive_Overview.md";
  slug: "tech/2023/understanding_the_net_core_framework_a_comprehensive_overview";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Understanding_the_.NET_Standard_Library.md": {
	id: "tech/2023/Understanding_the_.NET_Standard_Library.md";
  slug: "tech/2023/understanding_the_net_standard_library";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Understanding_the_Netty_Network_Framework.md": {
	id: "tech/2023/Understanding_the_Netty_Network_Framework.md";
  slug: "tech/2023/understanding_the_netty_network_framework";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Using_Celery_in_Python_A_Comprehensive_Guide.md": {
	id: "tech/2023/Using_Celery_in_Python_A_Comprehensive_Guide.md";
  slug: "tech/2023/using_celery_in_python_a_comprehensive_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Using_Cobra_in_Golang_A_Comprehensive_Guide.md": {
	id: "tech/2023/Using_Cobra_in_Golang_A_Comprehensive_Guide.md";
  slug: "tech/2023/using_cobra_in_golang_a_comprehensive_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Using_Django_in_Python_A_Comprehensive_Guide.md": {
	id: "tech/2023/Using_Django_in_Python_A_Comprehensive_Guide.md";
  slug: "tech/2023/using_django_in_python_a_comprehensive_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Using_Fabric_in_Python_A_Step-by-Step_Guide.md": {
	id: "tech/2023/Using_Fabric_in_Python_A_Step-by-Step_Guide.md";
  slug: "tech/2023/using_fabric_in_python_a_step-by-step_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Using_Gin_Framework_in_Golang.md": {
	id: "tech/2023/Using_Gin_Framework_in_Golang.md";
  slug: "tech/2023/using_gin_framework_in_golang";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Using_Go-Swagger_in_Golang_A_Comprehensive_Guide.md": {
	id: "tech/2023/Using_Go-Swagger_in_Golang_A_Comprehensive_Guide.md";
  slug: "tech/2023/using_go-swagger_in_golang_a_comprehensive_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Using_Jupyter_Notebook_in_Python_An_Interactive_Computing_Environment.md": {
	id: "tech/2023/Using_Jupyter_Notebook_in_Python_An_Interactive_Computing_Environment.md";
  slug: "tech/2023/using_jupyter_notebook_in_python_an_interactive_computing_environment";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Using_OpenCV_in_Python_A_Comprehensive_Guide.md": {
	id: "tech/2023/Using_OpenCV_in_Python_A_Comprehensive_Guide.md";
  slug: "tech/2023/using_opencv_in_python_a_comprehensive_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Using_Pillow_in_Python_A_Comprehensive_Guide.md": {
	id: "tech/2023/Using_Pillow_in_Python_A_Comprehensive_Guide.md";
  slug: "tech/2023/using_pillow_in_python_a_comprehensive_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Using_PyInstaller_to_Create_Standalone_Executables_in_Python.md": {
	id: "tech/2023/Using_PyInstaller_to_Create_Standalone_Executables_in_Python.md";
  slug: "tech/2023/using_pyinstaller_to_create_standalone_executables_in_python";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Using_PyJWT_for_JSON_Web_Token_Authentication_in_Python.md": {
	id: "tech/2023/Using_PyJWT_for_JSON_Web_Token_Authentication_in_Python.md";
  slug: "tech/2023/using_pyjwt_for_json_web_token_authentication_in_python";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Using_PyPDF2_in_Python_A_Comprehensive_Guide.md": {
	id: "tech/2023/Using_PyPDF2_in_Python_A_Comprehensive_Guide.md";
  slug: "tech/2023/using_pypdf2_in_python_a_comprehensive_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Using_PySerial_in_Python_A_Comprehensive_Guide.md": {
	id: "tech/2023/Using_PySerial_in_Python_A_Comprehensive_Guide.md";
  slug: "tech/2023/using_pyserial_in_python_a_comprehensive_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Using_PyTorch_in_Python_An_Introduction_to_Machine_Learning_and_Deep_Learning.md": {
	id: "tech/2023/Using_PyTorch_in_Python_An_Introduction_to_Machine_Learning_and_Deep_Learning.md";
  slug: "tech/2023/using_pytorch_in_python_an_introduction_to_machine_learning_and_deep_learning";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Using_Pygame_in_Python_A_Comprehensive_Guide.md": {
	id: "tech/2023/Using_Pygame_in_Python_A_Comprehensive_Guide.md";
  slug: "tech/2023/using_pygame_in_python_a_comprehensive_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Using_Redis_in_Python_A_Comprehensive_Guide.md": {
	id: "tech/2023/Using_Redis_in_Python_A_Comprehensive_Guide.md";
  slug: "tech/2023/using_redis_in_python_a_comprehensive_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Using_Requests_in_Python_A_Comprehensive_Guide.md": {
	id: "tech/2023/Using_Requests_in_Python_A_Comprehensive_Guide.md";
  slug: "tech/2023/using_requests_in_python_a_comprehensive_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Using_Rust's_Benchmarking_Framework_for_Performance_Testing.md": {
	id: "tech/2023/Using_Rust's_Benchmarking_Framework_for_Performance_Testing.md";
  slug: "tech/2023/using_rusts_benchmarking_framework_for_performance_testing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Using_Rust's_Data_Structures_for_Efficient_and_Safe_Data_Manipulation.md": {
	id: "tech/2023/Using_Rust's_Data_Structures_for_Efficient_and_Safe_Data_Manipulation.md";
  slug: "tech/2023/using_rusts_data_structures_for_efficient_and_safe_data_manipulation";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Using_Rust's_Error_Handling_Mechanisms_Effectively.md": {
	id: "tech/2023/Using_Rust's_Error_Handling_Mechanisms_Effectively.md";
  slug: "tech/2023/using_rusts_error_handling_mechanisms_effectively";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Using_Rust's_Option_and_Result_Types_for_Safer_and_More_Expressive_Code.md": {
	id: "tech/2023/Using_Rust's_Option_and_Result_Types_for_Safer_and_More_Expressive_Code.md";
  slug: "tech/2023/using_rusts_option_and_result_types_for_safer_and_more_expressive_code";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Using_Rust's_Profiling_Tools_for_Performance_Optimization.md": {
	id: "tech/2023/Using_Rust's_Profiling_Tools_for_Performance_Optimization.md";
  slug: "tech/2023/using_rusts_profiling_tools_for_performance_optimization";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Using_SQLAlchemy_in_Python_A_Comprehensive_Guide.md": {
	id: "tech/2023/Using_SQLAlchemy_in_Python_A_Comprehensive_Guide.md";
  slug: "tech/2023/using_sqlalchemy_in_python_a_comprehensive_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Using_TensorFlow_in_Python_A_Comprehensive_Guide.md": {
	id: "tech/2023/Using_TensorFlow_in_Python_A_Comprehensive_Guide.md";
  slug: "tech/2023/using_tensorflow_in_python_a_comprehensive_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Using_Testify_in_Golang_A_Comprehensive_Guide.md": {
	id: "tech/2023/Using_Testify_in_Golang_A_Comprehensive_Guide.md";
  slug: "tech/2023/using_testify_in_golang_a_comprehensive_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Using_WebAssembly_for_Blockchain_Development.md": {
	id: "tech/2023/Using_WebAssembly_for_Blockchain_Development.md";
  slug: "tech/2023/using_webassembly_for_blockchain_development";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Using_WebAssembly_for_Machine_Learning_A_Comprehensive_Guide.md": {
	id: "tech/2023/Using_WebAssembly_for_Machine_Learning_A_Comprehensive_Guide.md";
  slug: "tech/2023/using_webassembly_for_machine_learning_a_comprehensive_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Using_WebAssembly_for_Multimedia_Processing.md": {
	id: "tech/2023/Using_WebAssembly_for_Multimedia_Processing.md";
  slug: "tech/2023/using_webassembly_for_multimedia_processing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Using_WebAssembly_for_Scientific_Computing.md": {
	id: "tech/2023/Using_WebAssembly_for_Scientific_Computing.md";
  slug: "tech/2023/using_webassembly_for_scientific_computing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Using_WebAssembly_for_Serverless_Computing.md": {
	id: "tech/2023/Using_WebAssembly_for_Serverless_Computing.md";
  slug: "tech/2023/using_webassembly_for_serverless_computing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Using_WebAssembly_to_Replace_Native_Desktop_Applications.md": {
	id: "tech/2023/Using_WebAssembly_to_Replace_Native_Desktop_Applications.md";
  slug: "tech/2023/using_webassembly_to_replace_native_desktop_applications";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Using_`echo`_in_Golang_for_Efficient_Web_Development.md": {
	id: "tech/2023/Using_`echo`_in_Golang_for_Efficient_Web_Development.md";
  slug: "tech/2023/using_echo_in_golang_for_efficient_web_development";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Using_`zap`_for_Efficient_Logging_in_Go.md": {
	id: "tech/2023/Using_`zap`_for_Efficient_Logging_in_Go.md";
  slug: "tech/2023/using_zap_for_efficient_logging_in_go";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Using_gRPC_in_Go_A_Comprehensive_Guide.md": {
	id: "tech/2023/Using_gRPC_in_Go_A_Comprehensive_Guide.md";
  slug: "tech/2023/using_grpc_in_go_a_comprehensive_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Using_graphql-go_in_Golang_A_Comprehensive_Guide.md": {
	id: "tech/2023/Using_graphql-go_in_Golang_A_Comprehensive_Guide.md";
  slug: "tech/2023/using_graphql-go_in_golang_a_comprehensive_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/Web_Scraping_with_Beautiful_Soup_in_Python.md": {
	id: "tech/2023/Web_Scraping_with_Beautiful_Soup_in_Python.md";
  slug: "tech/2023/web_scraping_with_beautiful_soup_in_python";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/csvs_with_cpp.md": {
	id: "tech/2023/csvs_with_cpp.md";
  slug: "tech/2023/csvs_with_cpp";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/drogon_with_trump_api.md": {
	id: "tech/2023/drogon_with_trump_api.md";
  slug: "tech/2023/drogon_with_trump_api";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/ffmpeg_cpp.md": {
	id: "tech/2023/ffmpeg_cpp.md";
  slug: "tech/2023/ffmpeg_cpp";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/intro_to_laravel.md": {
	id: "tech/2023/intro_to_laravel.md";
  slug: "tech/2023/intro_to_laravel";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/intro_to_typst.md": {
	id: "tech/2023/intro_to_typst.md";
  slug: "tech/2023/intro_to_typst";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/list_of_dumb_ways_to_fix_programs.md": {
	id: "tech/2023/list_of_dumb_ways_to_fix_programs.md";
  slug: "tech/2023/list_of_dumb_ways_to_fix_programs";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/optimize_images_for_web.md": {
	id: "tech/2023/optimize_images_for_web.md";
  slug: "tech/2023/optimize_images_for_web";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/pycaret_300.md": {
	id: "tech/2023/pycaret_300.md";
  slug: "tech/2023/pycaret_300";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/using_fetch_to_remove_bad_links.md": {
	id: "tech/2023/using_fetch_to_remove_bad_links.md";
  slug: "tech/2023/using_fetch_to_remove_bad_links";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2023/web3_introduction.md": {
	id: "tech/2023/web3_introduction.md";
  slug: "tech/2023/web3_introduction";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2024/azure_cloud_storage.md": {
	id: "tech/2024/azure_cloud_storage.md";
  slug: "tech/2024/azure_cloud_storage";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2024/extracting_investor_presentations_from_web.md": {
	id: "tech/2024/extracting_investor_presentations_from_web.md";
  slug: "tech/2024/extracting_investor_presentations_from_web";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2024/file_uploads_with_python.md": {
	id: "tech/2024/file_uploads_with_python.md";
  slug: "tech/2024/file_uploads_with_python";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2024/getting_started_with_remix.md": {
	id: "tech/2024/getting_started_with_remix.md";
  slug: "tech/2024/getting_started_with_remix";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2024/getting_started_with_requests_and_proxies.md": {
	id: "tech/2024/getting_started_with_requests_and_proxies.md";
  slug: "tech/2024/getting_started_with_requests_and_proxies";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2024/getting_started_with_zeep.md": {
	id: "tech/2024/getting_started_with_zeep.md";
  slug: "tech/2024/getting_started_with_zeep";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2024/gpt_integration_in_excel.md": {
	id: "tech/2024/gpt_integration_in_excel.md";
  slug: "tech/2024/gpt_integration_in_excel";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2024/hosting_an_ocr_app_on_azure.md": {
	id: "tech/2024/hosting_an_ocr_app_on_azure.md";
  slug: "tech/2024/hosting_an_ocr_app_on_azure";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2024/how_to_setup_localai.md": {
	id: "tech/2024/how_to_setup_localai.md";
  slug: "tech/2024/how_to_setup_localai";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2024/http_ssl_update.md": {
	id: "tech/2024/http_ssl_update.md";
  slug: "tech/2024/http_ssl_update";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2024/integrating_azure_active_directory_with_wagtail.md": {
	id: "tech/2024/integrating_azure_active_directory_with_wagtail.md";
  slug: "tech/2024/integrating_azure_active_directory_with_wagtail";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2024/mermaid_diagram_creation.md": {
	id: "tech/2024/mermaid_diagram_creation.md";
  slug: "tech/2024/mermaid_diagram_creation";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/2024/pytest_adding_fixtures.md": {
	id: "tech/2024/pytest_adding_fixtures.md";
  slug: "tech/2024/pytest_adding_fixtures";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/ai/ai_tech.md": {
	id: "tech/ai/ai_tech.md";
  slug: "tech/ai/ai_tech";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/ai/how_I_generate_logos_with_ai.md": {
	id: "tech/ai/how_I_generate_logos_with_ai.md";
  slug: "tech/ai/how_i_generate_logos_with_ai";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/autohotkey/automate_windows_with_auto_hot_key.md": {
	id: "tech/autohotkey/automate_windows_with_auto_hot_key.md";
  slug: "tech/autohotkey/automate_windows_with_auto_hot_key";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/autohotkey/how_to_use_autohotkey.md": {
	id: "tech/autohotkey/how_to_use_autohotkey.md";
  slug: "tech/autohotkey/how_to_use_autohotkey";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/basic_react_native_template.md": {
	id: "tech/basic_react_native_template.md";
  slug: "tech/basic_react_native_template";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/building_out_latex_diagrams.md": {
	id: "tech/building_out_latex_diagrams.md";
  slug: "tech/building_out_latex_diagrams";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/cpp/Boost_C++20_programming.md": {
	id: "tech/cpp/Boost_C++20_programming.md";
  slug: "tech/cpp/boost_c20_programming";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/cpp/Boost_Your_C++_Programming_with_Boost_Library.md": {
	id: "tech/cpp/Boost_Your_C++_Programming_with_Boost_Library.md";
  slug: "tech/cpp/boost_your_c_programming_with_boost_library";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/cpp/Using_Dear_ImGui_in_C++_A_Guide_to_Immediate_Mode_GUIs.md": {
	id: "tech/cpp/Using_Dear_ImGui_in_C++_A_Guide_to_Immediate_Mode_GUIs.md";
  slug: "tech/cpp/using_dear_imgui_in_c_a_guide_to_immediate_mode_guis";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/cpp/Using_FFmpeg_in_C++_A_Comprehensive_Guide.md": {
	id: "tech/cpp/Using_FFmpeg_in_C++_A_Comprehensive_Guide.md";
  slug: "tech/cpp/using_ffmpeg_in_c_a_comprehensive_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/cpp/Using_OpenCV_in_C++_A_Comprehensive_Guide.md": {
	id: "tech/cpp/Using_OpenCV_in_C++_A_Comprehensive_Guide.md";
  slug: "tech/cpp/using_opencv_in_c_a_comprehensive_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/cpp/Using_OpenSSL_in_C++_A_Comprehensive_Guide.md": {
	id: "tech/cpp/Using_OpenSSL_in_C++_A_Comprehensive_Guide.md";
  slug: "tech/cpp/using_openssl_in_c_a_comprehensive_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/cpp/Using_POCO_in_C++_A_Guide_to_the_Portable_Components_Library.md": {
	id: "tech/cpp/Using_POCO_in_C++_A_Guide_to_the_Portable_Components_Library.md";
  slug: "tech/cpp/using_poco_in_c_a_guide_to_the_portable_components_library";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/cpp/Utilizing_the_C++_Standard_Library_for_Efficient_and_Robust_Code.md": {
	id: "tech/cpp/Utilizing_the_C++_Standard_Library_for_Efficient_and_Robust_Code.md";
  slug: "tech/cpp/utilizing_the_c_standard_library_for_efficient_and_robust_code";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/css/css_animations_in_react.md": {
	id: "tech/css/css_animations_in_react.md";
  slug: "tech/css/css_animations_in_react";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/css/css_animations_in_vue.md": {
	id: "tech/css/css_animations_in_vue.md";
  slug: "tech/css/css_animations_in_vue";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/css/css_in_jsx_vs_react_styled.md": {
	id: "tech/css/css_in_jsx_vs_react_styled.md";
  slug: "tech/css/css_in_jsx_vs_react_styled";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/css/how_to_convert_inline_jsx_styles_to_css_styles.md": {
	id: "tech/css/how_to_convert_inline_jsx_styles_to_css_styles.md";
  slug: "tech/css/how_to_convert_inline_jsx_styles_to_css_styles";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/css/how_to_implement_page_transitions_in_next_js.md": {
	id: "tech/css/how_to_implement_page_transitions_in_next_js.md";
  slug: "tech/css/how_to_implement_page_transitions_in_next_js";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/dapps/tracking_files_with_a_smart_contract.md": {
	id: "tech/dapps/tracking_files_with_a_smart_contract.md";
  slug: "tech/dapps/tracking_files_with_a_smart_contract";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/dapps/url_shortener_with_nuxt.md": {
	id: "tech/dapps/url_shortener_with_nuxt.md";
  slug: "tech/dapps/url_shortener_with_nuxt";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/deno/A_Comprehensive_Guide_to_Using_Cac_in_Deno.md": {
	id: "tech/deno/A_Comprehensive_Guide_to_Using_Cac_in_Deno.md";
  slug: "tech/deno/a_comprehensive_guide_to_using_cac_in_deno";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/deno/Leveraging_Autopilot_in_Deno_A_Step-by-Step_Guide.md": {
	id: "tech/deno/Leveraging_Autopilot_in_Deno_A_Step-by-Step_Guide.md";
  slug: "tech/deno/leveraging_autopilot_in_deno_a_step-by-step_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/deno/Using_Astrodon_in_Deno_A_Comprehensive_Guide.md": {
	id: "tech/deno/Using_Astrodon_in_Deno_A_Comprehensive_Guide.md";
  slug: "tech/deno/using_astrodon_in_deno_a_comprehensive_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/deno/Using_Fresh_in_Deno_for_Web_Development.md": {
	id: "tech/deno/Using_Fresh_in_Deno_for_Web_Development.md";
  slug: "tech/deno/using_fresh_in_deno_for_web_development";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/deno/Using_Pogo_in_Deno_for_Web_Development.md": {
	id: "tech/deno/Using_Pogo_in_Deno_for_Web_Development.md";
  slug: "tech/deno/using_pogo_in_deno_for_web_development";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/evaluating_whispers_vs_current_alternatives.md": {
	id: "tech/evaluating_whispers_vs_current_alternatives.md";
  slug: "tech/evaluating_whispers_vs_current_alternatives";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/flutter/alfred_backend_with_open_food_facts_api.md": {
	id: "tech/flutter/alfred_backend_with_open_food_facts_api.md";
  slug: "tech/flutter/alfred_backend_with_open_food_facts_api";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/flutter/chrome_extension_flutter.md": {
	id: "tech/flutter/chrome_extension_flutter.md";
  slug: "tech/flutter/chrome_extension_flutter";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/flutter/dart_functions.md": {
	id: "tech/flutter/dart_functions.md";
  slug: "tech/flutter/dart_functions";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/flutter/dart_lcg.md": {
	id: "tech/flutter/dart_lcg.md";
  slug: "tech/flutter/dart_lcg";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/flutter/how_to_deploy_dart_to_hs.md": {
	id: "tech/flutter/how_to_deploy_dart_to_hs.md";
  slug: "tech/flutter/how_to_deploy_dart_to_hs";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/flutter/pokedex_app_partI.md": {
	id: "tech/flutter/pokedex_app_partI.md";
  slug: "tech/flutter/pokedex_app_parti";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/flutter/pokedex_app_partII.md": {
	id: "tech/flutter/pokedex_app_partII.md";
  slug: "tech/flutter/pokedex_app_partii";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/flutter/resume_generation_dart.md": {
	id: "tech/flutter/resume_generation_dart.md";
  slug: "tech/flutter/resume_generation_dart";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/flutter/scrapping_data_for_pokedex.md": {
	id: "tech/flutter/scrapping_data_for_pokedex.md";
  slug: "tech/flutter/scrapping_data_for_pokedex";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/flutter/side_hussle_income_tracker.md": {
	id: "tech/flutter/side_hussle_income_tracker.md";
  slug: "tech/flutter/side_hussle_income_tracker";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/flutter/steam_top_sellers_in_dart.md": {
	id: "tech/flutter/steam_top_sellers_in_dart.md";
  slug: "tech/flutter/steam_top_sellers_in_dart";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/flutter_app_for_trump_quotes.md": {
	id: "tech/flutter_app_for_trump_quotes.md";
  slug: "tech/flutter_app_for_trump_quotes";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/flutter_todo_list_with_supabase.md": {
	id: "tech/flutter_todo_list_with_supabase.md";
  slug: "tech/flutter_todo_list_with_supabase";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/getting_started_with_strapi_cloud.md": {
	id: "tech/getting_started_with_strapi_cloud.md";
  slug: "tech/getting_started_with_strapi_cloud";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/git_hosting.md": {
	id: "tech/git_hosting.md";
  slug: "tech/git_hosting";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/go/Gocui.md": {
	id: "tech/go/Gocui.md";
  slug: "tech/go/gocui";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/go/Lipgloss_in_Golang_Beautifully_Style_Your_cli.md": {
	id: "tech/go/Lipgloss_in_Golang_Beautifully_Style_Your_cli.md";
  slug: "tech/go/lipgloss_in_golang_beautifully_style_your_cli";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/go/Simplify_Your_Golang_Build_Process_with_1build.md": {
	id: "tech/go/Simplify_Your_Golang_Build_Process_with_1build.md";
  slug: "tech/go/simplify_your_golang_build_process_with_1build";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/go/Streamline_Your_Golang_Builds_with_Mmake_A_Comprehensive_Guide.md": {
	id: "tech/go/Streamline_Your_Golang_Builds_with_Mmake_A_Comprehensive_Guide.md";
  slug: "tech/go/streamline_your_golang_builds_with_mmake_a_comprehensive_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/go/Using_Chalk_for_Colorful_Terminal_Output_in_Go_(Golang).md": {
	id: "tech/go/Using_Chalk_for_Colorful_Terminal_Output_in_Go_(Golang).md";
  slug: "tech/go/using_chalk_for_colorful_terminal_output_in_go_golang";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/go/Using_Cleanenv_for_Configuration_Management_in_Golang.md": {
	id: "tech/go/Using_Cleanenv_for_Configuration_Management_in_Golang.md";
  slug: "tech/go/using_cleanenv_for_configuration_management_in_golang";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/go/Using_Dictionary_in_GoLang_with_Maps.md": {
	id: "tech/go/Using_Dictionary_in_GoLang_with_Maps.md";
  slug: "tech/go/using_dictionary_in_golang_with_maps";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/go/Using_Gaper_A_Powerful_Process_Supervisor.md": {
	id: "tech/go/Using_Gaper_A_Powerful_Process_Supervisor.md";
  slug: "tech/go/using_gaper_a_powerful_process_supervisor";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/go/Using_GoCron_Guide_to_Task_Scheduling.md": {
	id: "tech/go/Using_GoCron_Guide_to_Task_Scheduling.md";
  slug: "tech/go/using_gocron_guide_to_task_scheduling";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/go/Using_Message_Passing_InterfaceA_Guide_to_MPB.md": {
	id: "tech/go/Using_Message_Passing_InterfaceA_Guide_to_MPB.md";
  slug: "tech/go/using_message_passing_interfacea_guide_to_mpb";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/go/Using_SQLx_in_Golang_A_Comprehensive_Guide.md": {
	id: "tech/go/Using_SQLx_in_Golang_A_Comprehensive_Guide.md";
  slug: "tech/go/using_sqlx_in_golang_a_comprehensive_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/go/Using_Subcmd_in_Golang_Enhancing_CLI_Applications_with_Subcommands.md": {
	id: "tech/go/Using_Subcmd_in_Golang_Enhancing_CLI_Applications_with_Subcommands.md";
  slug: "tech/go/using_subcmd_in_golang_enhancing_cli_applications_with_subcommands";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/go/Using_Task_in_GoLang_A_Comprehensive_Guide.md": {
	id: "tech/go/Using_Task_in_GoLang_A_Comprehensive_Guide.md";
  slug: "tech/go/using_task_in_golang_a_comprehensive_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/go/Using_UIProgress_in_GoLang_A_Step-by-Step_Guide.md": {
	id: "tech/go/Using_UIProgress_in_GoLang_A_Step-by-Step_Guide.md";
  slug: "tech/go/using_uiprogress_in_golang_a_step-by-step_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/go/Using_Viper_in_Golang_for_Configuration_Management.md": {
	id: "tech/go/Using_Viper_in_Golang_for_Configuration_Management.md";
  slug: "tech/go/using_viper_in_golang_for_configuration_management";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/go/Using_`uitable`_in_Go_for_Flexible_and_Beautiful_Console_Output.md": {
	id: "tech/go/Using_`uitable`_in_Go_for_Flexible_and_Beautiful_Console_Output.md";
  slug: "tech/go/using_uitable_in_go_for_flexible_and_beautiful_console_output";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/go/Utilizing_GCSS_A_Golang_CSS_Preprocessor.md": {
	id: "tech/go/Utilizing_GCSS_A_Golang_CSS_Preprocessor.md";
  slug: "tech/go/utilizing_gcss_a_golang_css_preprocessor";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/go/Utilizing_Micha_in_Golang_An_Efficient_Web_Socket_Client.md": {
	id: "tech/go/Utilizing_Micha_in_Golang_An_Efficient_Web_Socket_Client.md";
  slug: "tech/go/utilizing_micha_in_golang_an_efficient_web_socket_client";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/go/Utilizing_`uilive`_for_Real-Time_Terminal_Updates_in_Golang.md": {
	id: "tech/go/Utilizing_`uilive`_for_Real-Time_Terminal_Updates_in_Golang.md";
  slug: "tech/go/utilizing_uilive_for_real-time_terminal_updates_in_golang";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/go/Visualize_Data_with_Asciigraph_in_Golang.md": {
	id: "tech/go/Visualize_Data_with_Asciigraph_in_Golang.md";
  slug: "tech/go/visualize_data_with_asciigraph_in_golang";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/go/basic_wails_app.md": {
	id: "tech/go/basic_wails_app.md";
  slug: "tech/go/basic_wails_app";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/go/bitset.md": {
	id: "tech/go/bitset.md";
  slug: "tech/go/bitset";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/go/book_api_in_golang.md": {
	id: "tech/go/book_api_in_golang.md";
  slug: "tech/go/book_api_in_golang";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/go/chapter_10_why_golang.md": {
	id: "tech/go/chapter_10_why_golang.md";
  slug: "tech/go/chapter_10_why_golang";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/go/chapter_1_why_golang.md": {
	id: "tech/go/chapter_1_why_golang.md";
  slug: "tech/go/chapter_1_why_golang";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/go/chapter_2_why_golang.md": {
	id: "tech/go/chapter_2_why_golang.md";
  slug: "tech/go/chapter_2_why_golang";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/go/chapter_3_why_golang.md": {
	id: "tech/go/chapter_3_why_golang.md";
  slug: "tech/go/chapter_3_why_golang";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/go/chapter_4_why_golang.md": {
	id: "tech/go/chapter_4_why_golang.md";
  slug: "tech/go/chapter_4_why_golang";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/go/chapter_5_why_golang.md": {
	id: "tech/go/chapter_5_why_golang.md";
  slug: "tech/go/chapter_5_why_golang";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/go/chapter_6_why_golang.md": {
	id: "tech/go/chapter_6_why_golang.md";
  slug: "tech/go/chapter_6_why_golang";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/go/chapter_7_why_golang.md": {
	id: "tech/go/chapter_7_why_golang.md";
  slug: "tech/go/chapter_7_why_golang";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/go/chapter_8_why_golang.md": {
	id: "tech/go/chapter_8_why_golang.md";
  slug: "tech/go/chapter_8_why_golang";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/go/chapter_9_why_golang.md": {
	id: "tech/go/chapter_9_why_golang.md";
  slug: "tech/go/chapter_9_why_golang";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/go/dnote.md": {
	id: "tech/go/dnote.md";
  slug: "tech/go/dnote";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/go/getting_started_with_go_audio.md": {
	id: "tech/go/getting_started_with_go_audio.md";
  slug: "tech/go/getting_started_with_go_audio";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/go/goflags.md": {
	id: "tech/go/goflags.md";
  slug: "tech/go/goflags";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/go/how_to_call_c_cplusplus_from_go.md": {
	id: "tech/go/how_to_call_c_cplusplus_from_go.md";
  slug: "tech/go/how_to_call_c_cplusplus_from_go";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/go/introduction_to_golang.md": {
	id: "tech/go/introduction_to_golang.md";
  slug: "tech/go/introduction_to_golang";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/go/moving_files_with_script_in_go.md": {
	id: "tech/go/moving_files_with_script_in_go.md";
  slug: "tech/go/moving_files_with_script_in_go";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/go/text_diff_tool_in_go.md": {
	id: "tech/go/text_diff_tool_in_go.md";
  slug: "tech/go/text_diff_tool_in_go";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/go/web_scrapping_in_golang.md": {
	id: "tech/go/web_scrapping_in_golang.md";
  slug: "tech/go/web_scrapping_in_golang";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/grabbing_top_anime_shows_from_mal.md": {
	id: "tech/grabbing_top_anime_shows_from_mal.md";
  slug: "tech/grabbing_top_anime_shows_from_mal";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/html_introduction.md": {
	id: "tech/html_introduction.md";
  slug: "tech/html_introduction";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/introduction_to_jupyter_notebooks.md": {
	id: "tech/introduction_to_jupyter_notebooks.md";
  slug: "tech/introduction_to_jupyter_notebooks";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/java/abstract_classes_in_kotlin.md": {
	id: "tech/java/abstract_classes_in_kotlin.md";
  slug: "tech/java/abstract_classes_in_kotlin";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/java/gui_programming_in_java.md": {
	id: "tech/java/gui_programming_in_java.md";
  slug: "tech/java/gui_programming_in_java";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/java/object_oriented_programming_in_kotlin.md": {
	id: "tech/java/object_oriented_programming_in_kotlin.md";
  slug: "tech/java/object_oriented_programming_in_kotlin";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/java/publishing_package_for_java.md": {
	id: "tech/java/publishing_package_for_java.md";
  slug: "tech/java/publishing_package_for_java";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/java/reflections_in_kotlin.md": {
	id: "tech/java/reflections_in_kotlin.md";
  slug: "tech/java/reflections_in_kotlin";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/java/set_and_map_in_java.md": {
	id: "tech/java/set_and_map_in_java.md";
  slug: "tech/java/set_and_map_in_java";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/jcenter_crashing_react_native_app.md": {
	id: "tech/jcenter_crashing_react_native_app.md";
  slug: "tech/jcenter_crashing_react_native_app";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/js/async_programming_with_javascript.md": {
	id: "tech/js/async_programming_with_javascript.md";
  slug: "tech/js/async_programming_with_javascript";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/js/building_a_price_card_component_in_react.md": {
	id: "tech/js/building_a_price_card_component_in_react.md";
  slug: "tech/js/building_a_price_card_component_in_react";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/js/building_cli_applications_in_typescript.md": {
	id: "tech/js/building_cli_applications_in_typescript.md";
  slug: "tech/js/building_cli_applications_in_typescript";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/js/caesar_cipher_in_vue.md": {
	id: "tech/js/caesar_cipher_in_vue.md";
  slug: "tech/js/caesar_cipher_in_vue";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/js/car_animation.md": {
	id: "tech/js/car_animation.md";
  slug: "tech/js/car_animation";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/js/clear_deactivated_twilio_numbers_with_bullmq_and_node.md": {
	id: "tech/js/clear_deactivated_twilio_numbers_with_bullmq_and_node.md";
  slug: "tech/js/clear_deactivated_twilio_numbers_with_bullmq_and_node";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/js/dates_in_javascript.md": {
	id: "tech/js/dates_in_javascript.md";
  slug: "tech/js/dates_in_javascript";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/js/deploy_to_overleaf_button.md": {
	id: "tech/js/deploy_to_overleaf_button.md";
  slug: "tech/js/deploy_to_overleaf_button";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/js/getting_started_with_google_maps.md": {
	id: "tech/js/getting_started_with_google_maps.md";
  slug: "tech/js/getting_started_with_google_maps";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/js/getting_started_with_node_and_express.md": {
	id: "tech/js/getting_started_with_node_and_express.md";
  slug: "tech/js/getting_started_with_node_and_express";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/js/how-to-use-react-native-navigation.md": {
	id: "tech/js/how-to-use-react-native-navigation.md";
  slug: "tech/js/how-to-use-react-native-navigation";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/js/how_to_use_resolutions_in_package_json.md": {
	id: "tech/js/how_to_use_resolutions_in_package_json.md";
  slug: "tech/js/how_to_use_resolutions_in_package_json";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/js/implementing_svg_styling_in_nextjs.md": {
	id: "tech/js/implementing_svg_styling_in_nextjs.md";
  slug: "tech/js/implementing_svg_styling_in_nextjs";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/js/intro_to_js.md": {
	id: "tech/js/intro_to_js.md";
  slug: "tech/js/intro_to_js";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/js/intro_to_react_spring.md": {
	id: "tech/js/intro_to_react_spring.md";
  slug: "tech/js/intro_to_react_spring";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/js/introduction_to_docker_with_express.md": {
	id: "tech/js/introduction_to_docker_with_express.md";
  slug: "tech/js/introduction_to_docker_with_express";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/js/investing_homepage.md": {
	id: "tech/js/investing_homepage.md";
  slug: "tech/js/investing_homepage";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/js/making_an_custom_image_component.md": {
	id: "tech/js/making_an_custom_image_component.md";
  slug: "tech/js/making_an_custom_image_component";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/js/nextjs_todo_list_neon.md": {
	id: "tech/js/nextjs_todo_list_neon.md";
  slug: "tech/js/nextjs_todo_list_neon";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/js/node_v18_release.md": {
	id: "tech/js/node_v18_release.md";
  slug: "tech/js/node_v18_release";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/js/phaser_networked_game.md": {
	id: "tech/js/phaser_networked_game.md";
  slug: "tech/js/phaser_networked_game";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/js/phaser_networked_game_II.md": {
	id: "tech/js/phaser_networked_game_II.md";
  slug: "tech/js/phaser_networked_game_ii";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/js/porting_static_site_to_nextra.md": {
	id: "tech/js/porting_static_site_to_nextra.md";
  slug: "tech/js/porting_static_site_to_nextra";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/js/react_native_maps.md": {
	id: "tech/js/react_native_maps.md";
  slug: "tech/js/react_native_maps";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/js/simple_chat_bot.md": {
	id: "tech/js/simple_chat_bot.md";
  slug: "tech/js/simple_chat_bot";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/js/ui/ensure_element_in_viewport.md": {
	id: "tech/js/ui/ensure_element_in_viewport.md";
  slug: "tech/js/ui/ensure_element_in_viewport";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/js/using_lol_api_to_get_games.md": {
	id: "tech/js/using_lol_api_to_get_games.md";
  slug: "tech/js/using_lol_api_to_get_games";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/js/vuepress_theme_cool.md": {
	id: "tech/js/vuepress_theme_cool.md";
  slug: "tech/js/vuepress_theme_cool";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/js/what_is_a_package_json_file.md": {
	id: "tech/js/what_is_a_package_json_file.md";
  slug: "tech/js/what_is_a_package_json_file";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/kotlin/Anko_A_Powerful_Library_for_Android_Development_in_Kotlin.md": {
	id: "tech/kotlin/Anko_A_Powerful_Library_for_Android_Development_in_Kotlin.md";
  slug: "tech/kotlin/anko_a_powerful_library_for_android_development_in_kotlin";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/kotlin/Introduction_to_KAndroid_Streamlining_Android_Development_in_Kotlin.md": {
	id: "tech/kotlin/Introduction_to_KAndroid_Streamlining_Android_Development_in_Kotlin.md";
  slug: "tech/kotlin/introduction_to_kandroid_streamlining_android_development_in_kotlin";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/kotlin/Parsing_JSON_with_Klaxon_in_Kotlin.md": {
	id: "tech/kotlin/Parsing_JSON_with_Klaxon_in_Kotlin.md";
  slug: "tech/kotlin/parsing_json_with_klaxon_in_kotlin";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/kotlin/Using_RxKotlin_in_Kotlin_A_Comprehensive_Guide.md": {
	id: "tech/kotlin/Using_RxKotlin_in_Kotlin_A_Comprehensive_Guide.md";
  slug: "tech/kotlin/using_rxkotlin_in_kotlin_a_comprehensive_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/net/An_Introduction_to_NLog_in_dottnet.md": {
	id: "tech/net/An_Introduction_to_NLog_in_dottnet.md";
  slug: "tech/net/an_introduction_to_nlog_in_dottnet";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/net/Swashbuckle_Simplifying_API_Documentation_in_Csharp.md": {
	id: "tech/net/Swashbuckle_Simplifying_API_Documentation_in_Csharp.md";
  slug: "tech/net/swashbuckle_simplifying_api_documentation_in_csharp";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/net/csharp_introduction.md": {
	id: "tech/net/csharp_introduction.md";
  slug: "tech/net/csharp_introduction";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/net/getting_started_with_aspnet.md": {
	id: "tech/net/getting_started_with_aspnet.md";
  slug: "tech/net/getting_started_with_aspnet";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/net/intro_to_linq.md": {
	id: "tech/net/intro_to_linq.md";
  slug: "tech/net/intro_to_linq";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/net/intro_to_mudblazor.md": {
	id: "tech/net/intro_to_mudblazor.md";
  slug: "tech/net/intro_to_mudblazor";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/net/minimum_api_ip_address.md": {
	id: "tech/net/minimum_api_ip_address.md";
  slug: "tech/net/minimum_api_ip_address";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/net/news_app_csharp.md": {
	id: "tech/net/news_app_csharp.md";
  slug: "tech/net/news_app_csharp";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/net/review_of_polygot_notebooks.md": {
	id: "tech/net/review_of_polygot_notebooks.md";
  slug: "tech/net/review_of_polygot_notebooks";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/net/web_scrapping_in_csharp.md": {
	id: "tech/net/web_scrapping_in_csharp.md";
  slug: "tech/net/web_scrapping_in_csharp";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/parsing_git_commits_with_dotnet.md": {
	id: "tech/parsing_git_commits_with_dotnet.md";
  slug: "tech/parsing_git_commits_with_dotnet";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/php/laravel_how_to_make_api.md": {
	id: "tech/php/laravel_how_to_make_api.md";
  slug: "tech/php/laravel_how_to_make_api";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/php/making_wordpress_theme.md": {
	id: "tech/php/making_wordpress_theme.md";
  slug: "tech/php/making_wordpress_theme";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/python/audio_training.md": {
	id: "tech/python/audio_training.md";
  slug: "tech/python/audio_training";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/python/chap_10.md": {
	id: "tech/python/chap_10.md";
  slug: "tech/python/chap_10";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/python/chap_4.md": {
	id: "tech/python/chap_4.md";
  slug: "tech/python/chap_4";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/python/chap_5.md": {
	id: "tech/python/chap_5.md";
  slug: "tech/python/chap_5";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/python/chap_6.md": {
	id: "tech/python/chap_6.md";
  slug: "tech/python/chap_6";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/python/chap_7.md": {
	id: "tech/python/chap_7.md";
  slug: "tech/python/chap_7";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/python/chap_8.md": {
	id: "tech/python/chap_8.md";
  slug: "tech/python/chap_8";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/python/chap_9.md": {
	id: "tech/python/chap_9.md";
  slug: "tech/python/chap_9";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/python/chatgpt_blog_generation.md": {
	id: "tech/python/chatgpt_blog_generation.md";
  slug: "tech/python/chatgpt_blog_generation";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/python/chatgpt_extract_description_and_keywords.md": {
	id: "tech/python/chatgpt_extract_description_and_keywords.md";
  slug: "tech/python/chatgpt_extract_description_and_keywords";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/python/chatgpt_vs_edgegpt.md": {
	id: "tech/python/chatgpt_vs_edgegpt.md";
  slug: "tech/python/chatgpt_vs_edgegpt";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/python/convert_pdfs_to_pngs_imagemagick.md": {
	id: "tech/python/convert_pdfs_to_pngs_imagemagick.md";
  slug: "tech/python/convert_pdfs_to_pngs_imagemagick";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/python/determine_size_of_objects_in_image_with_python.md": {
	id: "tech/python/determine_size_of_objects_in_image_with_python.md";
  slug: "tech/python/determine_size_of_objects_in_image_with_python";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/python/download_files_from_cse_exchange.md": {
	id: "tech/python/download_files_from_cse_exchange.md";
  slug: "tech/python/download_files_from_cse_exchange";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/python/extract_text_from_pdf_in_python.md": {
	id: "tech/python/extract_text_from_pdf_in_python.md";
  slug: "tech/python/extract_text_from_pdf_in_python";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/python/find_status_of_youtube_livestream.md": {
	id: "tech/python/find_status_of_youtube_livestream.md";
  slug: "tech/python/find_status_of_youtube_livestream";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/python/getting_started_with_opencv.md": {
	id: "tech/python/getting_started_with_opencv.md";
  slug: "tech/python/getting_started_with_opencv";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/python/getting_started_with_tortoise_tts.md": {
	id: "tech/python/getting_started_with_tortoise_tts.md";
  slug: "tech/python/getting_started_with_tortoise_tts";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/python/indeed_parsing.md": {
	id: "tech/python/indeed_parsing.md";
  slug: "tech/python/indeed_parsing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/python/introToPython/chap_1.md": {
	id: "tech/python/introToPython/chap_1.md";
  slug: "tech/python/introtopython/chap_1";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/python/introToPython/yield_functions.md": {
	id: "tech/python/introToPython/yield_functions.md";
  slug: "tech/python/introtopython/yield_functions";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/python/openbb_commodities.md": {
	id: "tech/python/openbb_commodities.md";
  slug: "tech/python/openbb_commodities";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/python/personal_finance.md": {
	id: "tech/python/personal_finance.md";
  slug: "tech/python/personal_finance";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/python/projects/contact_book.md": {
	id: "tech/python/projects/contact_book.md";
  slug: "tech/python/projects/contact_book";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/python/projects/password_generator.md": {
	id: "tech/python/projects/password_generator.md";
  slug: "tech/python/projects/password_generator";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/python/projects/url_shortener.md": {
	id: "tech/python/projects/url_shortener.md";
  slug: "tech/python/projects/url_shortener";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/python/projects/weather_app.md": {
	id: "tech/python/projects/weather_app.md";
  slug: "tech/python/projects/weather_app";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/python/python_introduction.md": {
	id: "tech/python/python_introduction.md";
  slug: "tech/python/python_introduction";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/python/qt_app.md": {
	id: "tech/python/qt_app.md";
  slug: "tech/python/qt_app";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/python/simple_deta_micro_service_to_view_uploaded_files.md": {
	id: "tech/python/simple_deta_micro_service_to_view_uploaded_files.md";
  slug: "tech/python/simple_deta_micro_service_to_view_uploaded_files";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/python/superbowl.md": {
	id: "tech/python/superbowl.md";
  slug: "tech/python/superbowl";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/python/transcribe_youtube_videos.md": {
	id: "tech/python/transcribe_youtube_videos.md";
  slug: "tech/python/transcribe_youtube_videos";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/python/using_pandas_and_bs4_for_web.md": {
	id: "tech/python/using_pandas_and_bs4_for_web.md";
  slug: "tech/python/using_pandas_and_bs4_for_web";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/python/youtube_api_get_videos_of_interest.md": {
	id: "tech/python/youtube_api_get_videos_of_interest.md";
  slug: "tech/python/youtube_api_get_videos_of_interest";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/react/class_components.md": {
	id: "tech/react/class_components.md";
  slug: "tech/react/class_components";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/react/intro_to_nextjs.md": {
	id: "tech/react/intro_to_nextjs.md";
  slug: "tech/react/intro_to_nextjs";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/react/react_context.md": {
	id: "tech/react/react_context.md";
  slug: "tech/react/react_context";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/react/react_functional_components.md": {
	id: "tech/react/react_functional_components.md";
  slug: "tech/react/react_functional_components";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/react/search_on_webpage.md": {
	id: "tech/react/search_on_webpage.md";
  slug: "tech/react/search_on_webpage";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/react/ui_frameworks_in_react.md": {
	id: "tech/react/ui_frameworks_in_react.md";
  slug: "tech/react/ui_frameworks_in_react";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/react_corp_landing_page.md": {
	id: "tech/react_corp_landing_page.md";
  slug: "tech/react_corp_landing_page";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/Accelerating_HashMap_Performance_in_Rust_with_Hashbrown.md": {
	id: "tech/rust/Accelerating_HashMap_Performance_in_Rust_with_Hashbrown.md";
  slug: "tech/rust/accelerating_hashmap_performance_in_rust_with_hashbrown";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/Creating_a_Basic_Windows_Application_with_WinAPI_and_Rust.md": {
	id: "tech/rust/Creating_a_Basic_Windows_Application_with_WinAPI_and_Rust.md";
  slug: "tech/rust/creating_a_basic_windows_application_with_winapi_and_rust";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/Interacting_with_Windows_File_System_using_WinAPI_in_Rust.md": {
	id: "tech/rust/Interacting_with_Windows_File_System_using_WinAPI_in_Rust.md";
  slug: "tech/rust/interacting_with_windows_file_system_using_winapi_in_rust";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/Interacting_with_the_Windows_Clipboard_using_WinAPI_in_Rust.md": {
	id: "tech/rust/Interacting_with_the_Windows_Clipboard_using_WinAPI_in_Rust.md";
  slug: "tech/rust/interacting_with_the_windows_clipboard_using_winapi_in_rust";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/Interacting_with_the_Windows_Registry_using_WinAPI_in_Rust.md": {
	id: "tech/rust/Interacting_with_the_Windows_Registry_using_WinAPI_in_Rust.md";
  slug: "tech/rust/interacting_with_the_windows_registry_using_winapi_in_rust";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/Tracing_in_Rust_A_Guide_to_Performance_Analysis_and_Debugging.md": {
	id: "tech/rust/Tracing_in_Rust_A_Guide_to_Performance_Analysis_and_Debugging.md";
  slug: "tech/rust/tracing_in_rust_a_guide_to_performance_analysis_and_debugging";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/Using_Coreutils_in_Rust.md": {
	id: "tech/rust/Using_Coreutils_in_Rust.md";
  slug: "tech/rust/using_coreutils_in_rust";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/Using_Generator_Functions_(genfuncs)_in_Rust.md": {
	id: "tech/rust/Using_Generator_Functions_(genfuncs)_in_Rust.md";
  slug: "tech/rust/using_generator_functions_genfuncs_in_rust";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/Using_Hexadecimal_in_Rust_A_Comprehensive_Guide.md": {
	id: "tech/rust/Using_Hexadecimal_in_Rust_A_Comprehensive_Guide.md";
  slug: "tech/rust/using_hexadecimal_in_rust_a_comprehensive_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/Using_OpenGMK_in_Rust_A_Comprehensive_Guide.md": {
	id: "tech/rust/Using_OpenGMK_in_Rust_A_Comprehensive_Guide.md";
  slug: "tech/rust/using_opengmk_in_rust_a_comprehensive_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/Using_Oxipng_in_Rust_A_Guide_to_Optimizing_PNG_Images.md": {
	id: "tech/rust/Using_Oxipng_in_Rust_A_Guide_to_Optimizing_PNG_Images.md";
  slug: "tech/rust/using_oxipng_in_rust_a_guide_to_optimizing_png_images";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/Using_Resvg_in_Rust_A_Comprehensive_Guide.md": {
	id: "tech/rust/Using_Resvg_in_Rust_A_Comprehensive_Guide.md";
  slug: "tech/rust/using_resvg_in_rust_a_comprehensive_guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/Using_Rustfmt_to_Format_Rust_Code.md": {
	id: "tech/rust/Using_Rustfmt_to_Format_Rust_Code.md";
  slug: "tech/rust/using_rustfmt_to_format_rust_code";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/Using_Rustls_A_Modern_TLS_Library_for_Rust.md": {
	id: "tech/rust/Using_Rustls_A_Modern_TLS_Library_for_Rust.md";
  slug: "tech/rust/using_rustls_a_modern_tls_library_for_rust";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/Using_Serenity_in_Rust_A_Guide_to_Building_Discord_Bots.md": {
	id: "tech/rust/Using_Serenity_in_Rust_A_Guide_to_Building_Discord_Bots.md";
  slug: "tech/rust/using_serenity_in_rust_a_guide_to_building_discord_bots";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/Using_WinAPI_in_Rust_to_Interact_with_the_Windows_Process_System.md": {
	id: "tech/rust/Using_WinAPI_in_Rust_to_Interact_with_the_Windows_Process_System.md";
  slug: "tech/rust/using_winapi_in_rust_to_interact_with_the_windows_process_system";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/Using_WinAPI_in_Rust_to_Manage_Windows_Services.md": {
	id: "tech/rust/Using_WinAPI_in_Rust_to_Manage_Windows_Services.md";
  slug: "tech/rust/using_winapi_in_rust_to_manage_windows_services";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/Using_Yaydl_in_Rust_A_Guide_to_Video_Downloading.md": {
	id: "tech/rust/Using_Yaydl_in_Rust_A_Guide_to_Video_Downloading.md";
  slug: "tech/rust/using_yaydl_in_rust_a_guide_to_video_downloading";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/Using_`rustc-hash`_in_Rust_A_Guide_to_Faster_and_Safer_Hashing.md": {
	id: "tech/rust/Using_`rustc-hash`_in_Rust_A_Guide_to_Faster_and_Safer_Hashing.md";
  slug: "tech/rust/using_rustc-hash_in_rust_a_guide_to_faster_and_safer_hashing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/Using_the_`cc`_Crate_in_Rust_for_C_Interoperability.md": {
	id: "tech/rust/Using_the_`cc`_Crate_in_Rust_for_C_Interoperability.md";
  slug: "tech/rust/using_the_cc_crate_in_rust_for_c_interoperability";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/building_web_apps_with_rust.md": {
	id: "tech/rust/building_web_apps_with_rust.md";
  slug: "tech/rust/building_web_apps_with_rust";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/computer_vision_in_rust.md": {
	id: "tech/rust/computer_vision_in_rust.md";
  slug: "tech/rust/computer_vision_in_rust";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/crash_proof_systems_in_rust.md": {
	id: "tech/rust/crash_proof_systems_in_rust.md";
  slug: "tech/rust/crash_proof_systems_in_rust";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/create_uuids_in_rust.md": {
	id: "tech/rust/create_uuids_in_rust.md";
  slug: "tech/rust/create_uuids_in_rust";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/dynamic_linking_in_rust.md": {
	id: "tech/rust/dynamic_linking_in_rust.md";
  slug: "tech/rust/dynamic_linking_in_rust";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/email_slicer_in_rust.md": {
	id: "tech/rust/email_slicer_in_rust.md";
  slug: "tech/rust/email_slicer_in_rust";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/file_size_tool_in_rust.md": {
	id: "tech/rust/file_size_tool_in_rust.md";
  slug: "tech/rust/file_size_tool_in_rust";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/getting_started_with_bigint.md": {
	id: "tech/rust/getting_started_with_bigint.md";
  slug: "tech/rust/getting_started_with_bigint";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/getting_started_with_hyper.md": {
	id: "tech/rust/getting_started_with_hyper.md";
  slug: "tech/rust/getting_started_with_hyper";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/getting_started_with_io_in_rust.md": {
	id: "tech/rust/getting_started_with_io_in_rust.md";
  slug: "tech/rust/getting_started_with_io_in_rust";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/getting_started_with_logging_in_rust.md": {
	id: "tech/rust/getting_started_with_logging_in_rust.md";
  slug: "tech/rust/getting_started_with_logging_in_rust";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/getting_started_with_mongodb_in_rust.md": {
	id: "tech/rust/getting_started_with_mongodb_in_rust.md";
  slug: "tech/rust/getting_started_with_mongodb_in_rust";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/getting_started_with_mysql_in_rust.md": {
	id: "tech/rust/getting_started_with_mysql_in_rust.md";
  slug: "tech/rust/getting_started_with_mysql_in_rust";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/getting_started_with_ta_in_rust.md": {
	id: "tech/rust/getting_started_with_ta_in_rust.md";
  slug: "tech/rust/getting_started_with_ta_in_rust";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/getting_started_with_terminius_db_in_rust.md": {
	id: "tech/rust/getting_started_with_terminius_db_in_rust.md";
  slug: "tech/rust/getting_started_with_terminius_db_in_rust";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/getting_started_with_threads_in_rust.md": {
	id: "tech/rust/getting_started_with_threads_in_rust.md";
  slug: "tech/rust/getting_started_with_threads_in_rust";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/how_to_handle_times_with_chrono_in_rust.md": {
	id: "tech/rust/how_to_handle_times_with_chrono_in_rust.md";
  slug: "tech/rust/how_to_handle_times_with_chrono_in_rust";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/how_to_use_regular_expressions_in_rust.md": {
	id: "tech/rust/how_to_use_regular_expressions_in_rust.md";
  slug: "tech/rust/how_to_use_regular_expressions_in_rust";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/how_to_use_rust_collections.md": {
	id: "tech/rust/how_to_use_rust_collections.md";
  slug: "tech/rust/how_to_use_rust_collections";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/how_to_use_rust_ffi_capabilities.md": {
	id: "tech/rust/how_to_use_rust_ffi_capabilities.md";
  slug: "tech/rust/how_to_use_rust_ffi_capabilities";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/how_to_use_rust_macros.md": {
	id: "tech/rust/how_to_use_rust_macros.md";
  slug: "tech/rust/how_to_use_rust_macros";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/how_to_use_serde_json.md": {
	id: "tech/rust/how_to_use_serde_json.md";
  slug: "tech/rust/how_to_use_serde_json";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/how_to_use_unsafe_operators_in_rust.md": {
	id: "tech/rust/how_to_use_unsafe_operators_in_rust.md";
  slug: "tech/rust/how_to_use_unsafe_operators_in_rust";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/image_manipulation_in_rust.md": {
	id: "tech/rust/image_manipulation_in_rust.md";
  slug: "tech/rust/image_manipulation_in_rust";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/intro_to_apis_in_rust.md": {
	id: "tech/rust/intro_to_apis_in_rust.md";
  slug: "tech/rust/intro_to_apis_in_rust";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/intro_to_borrowed_reference_in_rust.md": {
	id: "tech/rust/intro_to_borrowed_reference_in_rust.md";
  slug: "tech/rust/intro_to_borrowed_reference_in_rust";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/intro_to_rust_lifetimes.md": {
	id: "tech/rust/intro_to_rust_lifetimes.md";
  slug: "tech/rust/intro_to_rust_lifetimes";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/intro_to_web_scrapping_in_rust.md": {
	id: "tech/rust/intro_to_web_scrapping_in_rust.md";
  slug: "tech/rust/intro_to_web_scrapping_in_rust";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/pokeapi_in_rust.md": {
	id: "tech/rust/pokeapi_in_rust.md";
  slug: "tech/rust/pokeapi_in_rust";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/rename_files_with_rust.md": {
	id: "tech/rust/rename_files_with_rust.md";
  slug: "tech/rust/rename_files_with_rust";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/rust_cross_language.md": {
	id: "tech/rust/rust_cross_language.md";
  slug: "tech/rust/rust_cross_language";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/rust_ffi_with_c_and_cplusplus.md": {
	id: "tech/rust/rust_ffi_with_c_and_cplusplus.md";
  slug: "tech/rust/rust_ffi_with_c_and_cplusplus";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/rust_synchronize_primitives.md": {
	id: "tech/rust/rust_synchronize_primitives.md";
  slug: "tech/rust/rust_synchronize_primitives";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/simple_chat_server.md": {
	id: "tech/rust/simple_chat_server.md";
  slug: "tech/rust/simple_chat_server";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/text_diff_tool_in_rust.md": {
	id: "tech/rust/text_diff_tool_in_rust.md";
  slug: "tech/rust/text_diff_tool_in_rust";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/todo_list_in_rust.md": {
	id: "tech/rust/todo_list_in_rust.md";
  slug: "tech/rust/todo_list_in_rust";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/using_rocket_for_web_apps.md": {
	id: "tech/rust/using_rocket_for_web_apps.md";
  slug: "tech/rust/using_rocket_for_web_apps";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/using_sha2_in_rust.md": {
	id: "tech/rust/using_sha2_in_rust.md";
  slug: "tech/rust/using_sha2_in_rust";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/rust/weather_apis_in_rust.md": {
	id: "tech/rust/weather_apis_in_rust.md";
  slug: "tech/rust/weather_apis_in_rust";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/screenshot_utility_for_mobile_apps.md": {
	id: "tech/screenshot_utility_for_mobile_apps.md";
  slug: "tech/screenshot_utility_for_mobile_apps";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/scripting/argparse_with_python.md": {
	id: "tech/scripting/argparse_with_python.md";
  slug: "tech/scripting/argparse_with_python";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/scripting/best_practises_for_powershell.md": {
	id: "tech/scripting/best_practises_for_powershell.md";
  slug: "tech/scripting/best_practises_for_powershell";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/scripting/caching_with_github_actions.md": {
	id: "tech/scripting/caching_with_github_actions.md";
  slug: "tech/scripting/caching_with_github_actions";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/scripting/creating_my_own_subs.md": {
	id: "tech/scripting/creating_my_own_subs.md";
  slug: "tech/scripting/creating_my_own_subs";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/scripting/github_action_to_detect_ip_address.md": {
	id: "tech/scripting/github_action_to_detect_ip_address.md";
  slug: "tech/scripting/github_action_to_detect_ip_address";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/scripting/intro_to_github_actions.md": {
	id: "tech/scripting/intro_to_github_actions.md";
  slug: "tech/scripting/intro_to_github_actions";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/scripting/intro_to_jql.md": {
	id: "tech/scripting/intro_to_jql.md";
  slug: "tech/scripting/intro_to_jql";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/scripting/modules_in_perl.md": {
	id: "tech/scripting/modules_in_perl.md";
  slug: "tech/scripting/modules_in_perl";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/scripting/parsing_git_commits_with_golang.md": {
	id: "tech/scripting/parsing_git_commits_with_golang.md";
  slug: "tech/scripting/parsing_git_commits_with_golang";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/scripting/pokemon_analytics.md": {
	id: "tech/scripting/pokemon_analytics.md";
  slug: "tech/scripting/pokemon_analytics";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/scripting/rank_engineers_in_bash.md": {
	id: "tech/scripting/rank_engineers_in_bash.md";
  slug: "tech/scripting/rank_engineers_in_bash";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/scripting/switch_from_circleci_to_githubactions.md": {
	id: "tech/scripting/switch_from_circleci_to_githubactions.md";
  slug: "tech/scripting/switch_from_circleci_to_githubactions";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/scripting/uploading_apks_to_google_drive_in_bitrise.md": {
	id: "tech/scripting/uploading_apks_to_google_drive_in_bitrise.md";
  slug: "tech/scripting/uploading_apks_to_google_drive_in_bitrise";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/scripting/using_git_to_filter_for_commits.md": {
	id: "tech/scripting/using_git_to_filter_for_commits.md";
  slug: "tech/scripting/using_git_to_filter_for_commits";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/seven_chatgpt_prompts.md": {
	id: "tech/seven_chatgpt_prompts.md";
  slug: "tech/seven_chatgpt_prompts";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/simple_react_collapse.md": {
	id: "tech/simple_react_collapse.md";
  slug: "tech/simple_react_collapse";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/simple_script_to_checkout_files.md": {
	id: "tech/simple_script_to_checkout_files.md";
  slug: "tech/simple_script_to_checkout_files";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/spaceshooter_in_go.md": {
	id: "tech/spaceshooter_in_go.md";
  slug: "tech/spaceshooter_in_go";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/tex/advanced_topics_in_tex.md": {
	id: "tech/tex/advanced_topics_in_tex.md";
  slug: "tech/tex/advanced_topics_in_tex";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/tex/collaborating_on_documents.md": {
	id: "tech/tex/collaborating_on_documents.md";
  slug: "tech/tex/collaborating_on_documents";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/tex/diagrams_in_tex.md": {
	id: "tech/tex/diagrams_in_tex.md";
  slug: "tech/tex/diagrams_in_tex";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/tex/front_back_matter_tex.md": {
	id: "tech/tex/front_back_matter_tex.md";
  slug: "tech/tex/front_back_matter_tex";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/tex/intro_to_tex.md": {
	id: "tech/tex/intro_to_tex.md";
  slug: "tech/tex/intro_to_tex";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/tex/intro_to_tex_diagrams.md": {
	id: "tech/tex/intro_to_tex_diagrams.md";
  slug: "tech/tex/intro_to_tex_diagrams";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/tex/math_in_tex.md": {
	id: "tech/tex/math_in_tex.md";
  slug: "tech/tex/math_in_tex";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/tex/syntax_of_tex.md": {
	id: "tech/tex/syntax_of_tex.md";
  slug: "tech/tex/syntax_of_tex";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/tex/text_formatting.md": {
	id: "tech/tex/text_formatting.md";
  slug: "tech/tex/text_formatting";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/updating_list_of_entries_in_react.md": {
	id: "tech/updating_list_of_entries_in_react.md";
  slug: "tech/updating_list_of_entries_in_react";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/upgrading_from_muiv4_to_mui_v5.md": {
	id: "tech/upgrading_from_muiv4_to_mui_v5.md";
  slug: "tech/upgrading_from_muiv4_to_mui_v5";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/uploading_videos_in_youtube_through_the_api.md": {
	id: "tech/uploading_videos_in_youtube_through_the_api.md";
  slug: "tech/uploading_videos_in_youtube_through_the_api";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/using_remotion_to_make_videos.md": {
	id: "tech/using_remotion_to_make_videos.md";
  slug: "tech/using_remotion_to_make_videos";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/using_whispers_to_transcribe_youtube_videos.md": {
	id: "tech/using_whispers_to_transcribe_youtube_videos.md";
  slug: "tech/using_whispers_to_transcribe_youtube_videos";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/utils/cloud_env_vars.md": {
	id: "tech/utils/cloud_env_vars.md";
  slug: "tech/utils/cloud_env_vars";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/utils/customizing_vscode_settings.md": {
	id: "tech/utils/customizing_vscode_settings.md";
  slug: "tech/utils/customizing_vscode_settings";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/video_for_game_highlights.md": {
	id: "tech/video_for_game_highlights.md";
  slug: "tech/video_for_game_highlights";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech/vue/getting_started_with_vuepress_theme_cool.md": {
	id: "tech/vue/getting_started_with_vuepress_theme_cool.md";
  slug: "tech/vue/getting_started_with_vuepress_theme_cool";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"thoughts_after_using_simply_static.md": {
	id: "thoughts_after_using_simply_static.md";
  slug: "thoughts_after_using_simply_static";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"thoughts_on_dash_v250.md": {
	id: "thoughts_on_dash_v250.md";
  slug: "thoughts_on_dash_v250";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"top_static_site_generator.md": {
	id: "top_static_site_generator.md";
  slug: "top_static_site_generator";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tracking_youtube_videos_with_nlp.md": {
	id: "tracking_youtube_videos_with_nlp.md";
  slug: "tracking_youtube_videos_with_nlp";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("./../../src/content/config.js");
}
