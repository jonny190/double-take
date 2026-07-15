## 1.0.0 (2026-07-15)


### ⚠ BREAKING CHANGES

* v1.0.0
* **release:** semantic release

### chore

* release ([824db79](https://github.com/jonny190/double-take/commit/824db79af1f007e4188e16d4d6723af746ea25b3))
* **release:** semantic release ([d11aa3e](https://github.com/jonny190/double-take/commit/d11aa3e3ada87e0f02eb3a94847db426fc548b94))


### Features

* ability to adjust thumbnail quality/size and page limit ([e5207fa](https://github.com/jonny190/double-take/commit/e5207fa8b39affa4a72e6213a0817b17781ff5ae))
* ability to change mqtt client_id ([#168](https://github.com/jonny190/double-take/issues/168)) ([98d7f2a](https://github.com/jonny190/double-take/commit/98d7f2a89f8a242685fc205d8e5afec7e53e995d))
* ability to include base64 encoded string in API results and MQTT messages ([#52](https://github.com/jonny190/double-take/issues/52)) ([233d56a](https://github.com/jonny190/double-take/commit/233d56a36e09b6c408131ce64461e449021b8811))
* ability to increase auth token expiration ([#78](https://github.com/jonny190/double-take/issues/78), [#80](https://github.com/jonny190/double-take/issues/80)) ([d68d39e](https://github.com/jonny190/double-take/commit/d68d39ef0faf5d20edfbf9099bc0108e7e4dd6fd))
* ability to mask images before processing [#79](https://github.com/jonny190/double-take/issues/79) ([decb245](https://github.com/jonny190/double-take/commit/decb245a5e1efd61af58e02354885e7952bf761f))
* ability to override frigate options per camera ([#110](https://github.com/jonny190/double-take/issues/110)) ([e2f93e6](https://github.com/jonny190/double-take/commit/e2f93e63d0f7031b92690e612f9b57d28ebe4adc))
* ability to remove folder if no trainings exist ([b1cc75f](https://github.com/jonny190/double-take/commit/b1cc75f2da83fd2cd960b27714bdf806c106e064))
* ability to reprocess images from the matches page ([#84](https://github.com/jonny190/double-take/issues/84)) ([809d5f3](https://github.com/jonny190/double-take/commit/809d5f3f3b6e41825a685deec8deb613306fc277))
* ability to resize source images with query string ([c2ea600](https://github.com/jonny190/double-take/commit/c2ea60055ccad0df7fe3b191a369146551f20812))
* ability to train an untrained image for a different person ([99a8251](https://github.com/jonny190/double-take/commit/99a82519f7acc9bdd7444d4803fc7af06caa80d2))
* add a delay expressed in seconds between each detection loop ([#83](https://github.com/jonny190/double-take/issues/83)) ([23dc29e](https://github.com/jonny190/double-take/commit/23dc29e4c9e4cb6a382650ac563006326995773a))
* add camera config snapshot topic subscription / refactor ([#57](https://github.com/jonny190/double-take/issues/57)) ([76316b5](https://github.com/jonny190/double-take/commit/76316b57ef0960a6583058e2a16b86f1950ce873))
* add createdAt, updatedAt to detector detail and tooltip ([#100](https://github.com/jonny190/double-take/issues/100)) ([03c83f5](https://github.com/jonny190/double-take/commit/03c83f5a24dc48632ede070bbba0a4905d703299))
* add detector test status to config page ([d66aa44](https://github.com/jonny190/double-take/commit/d66aa44524c46dac88d8df5a4c6f0e41cf995dab))
* add toolbar with version to ui routes ([9882c85](https://github.com/jonny190/double-take/commit/9882c85a685c1e8ba0c4c6a6e4f340525dd6d421))
* allow customizing frigate labels ([#95](https://github.com/jonny190/double-take/issues/95)) ([5eb100a](https://github.com/jonny190/double-take/commit/5eb100a0653e0fbe07efe827c0b0f6a9c07efd5a))
* allow uploading, retraining, and untraining from UI ([dd48b50](https://github.com/jonny190/double-take/commit/dd48b50cef94b0a47e9312b1f1ecca8dc2b9b3ea))
* api updates to support training from ui ([40cd69d](https://github.com/jonny190/double-take/commit/40cd69d166b158ec3ea3bfe40507cdb7c97c96a2))
* **api:** add auth routes to support login ([8e570f3](https://github.com/jonny190/double-take/commit/8e570f363cffbd3261911cf635e4c3f3433837af))
* **api:** add CodeProject.AI detector support ([38d58f8](https://github.com/jonny190/double-take/commit/38d58f83aae3bf0339b5e433d16013249e9fbf04))
* **api:** api/latest/<name>.jpg ([#120](https://github.com/jonny190/double-take/issues/120)) ([cd765ae](https://github.com/jonny190/double-take/commit/cd765ae39067221687a1ba3c72b7f2c92e8d5c46))
* **api:** opencv preprocess face check ([ed30ad1](https://github.com/jonny190/double-take/commit/ed30ad10dfe9f6d104619fa134e2d54698b1c1ff))
* **api:** route to support password reset ([5eea007](https://github.com/jonny190/double-take/commit/5eea00719e3838ed0f8a282e96cc2e09715dd019))
* **api:** update frigate sub label ([ad40018](https://github.com/jonny190/double-take/commit/ad40018ddc1319ccf6b3e0d2d98784d35931826d))
* **api:** upgrade to Express 5 ([1874ed7](https://github.com/jonny190/double-take/commit/1874ed7548ff9b4d5f2101fae9e836fe523745ed))
* **api:** use camera name when using custom mqtt topic ([70a4ce3](https://github.com/jonny190/double-take/commit/70a4ce3d0b6d22eb0619b31a65616b84beba7f98))
* **api:** validate config with jsonschema ([ad23c7b](https://github.com/jonny190/double-take/commit/ad23c7b30af61fdc9157f050de753438792d9028))
* **api:** zip export of storage directory ([ccae0f9](https://github.com/jonny190/double-take/commit/ccae0f987e39e7cad0a14fb0562a3bc4c84902fc))
* apple-touch-startup-image and theme color ([d8106bb](https://github.com/jonny190/double-take/commit/d8106bbf61169a0da9f5d14e239e697619117beb))
* aws rekognition support ([7904852](https://github.com/jonny190/double-take/commit/79048520fd66cb9c4144db11488558b82c8ada19))
* **compreface:** ability to adjust det_prob_threshold value ([583abdb](https://github.com/jonny190/double-take/commit/583abdbd1b078123f0fbf914f50f27a5c96b1e3f))
* **config:** anonymous telemetry data used to help deliver new features ([3e35091](https://github.com/jonny190/double-take/commit/3e3509115b9f250aee62387a6fc34e255e18be22))
* configure detector timeouts ([f654dec](https://github.com/jonny190/double-take/commit/f654dec6cdf9819bfdbc337261af4cf8e11a9d8e))
* copy yaml config with defaults ([052ab4b](https://github.com/jonny190/double-take/commit/052ab4b63553f70ae2457f2ead3a42c45bcdaf6a))
* custom webkit scrollbars to match theme ([b6620af](https://github.com/jonny190/double-take/commit/b6620afe570fc79e4d3f6968eb4c2b9217027840))
* **detectors:** process images from specific cameras ([5d39d0c](https://github.com/jonny190/double-take/commit/5d39d0c2c18d0851eccd6a8f698638906b0c36b0))
* edit secrets.yml from ui ([963cacd](https://github.com/jonny190/double-take/commit/963cacdf2074f6ccb56bbc9b3ffb0f3db38a53f4))
* enable or disable frigate mqtt topic snapshot processing ([#83](https://github.com/jonny190/double-take/issues/83)) ([3bf2bea](https://github.com/jonny190/double-take/commit/3bf2beac78d139a746d4dd6308e54aff65e5c155))
* filter training results when dropdown is used ([#89](https://github.com/jonny190/double-take/issues/89)) ([81232aa](https://github.com/jonny190/double-take/commit/81232aa7d2c23cf0fe72084ef9ea976c8e534732))
* frigate matches below an area target ([3365bc7](https://github.com/jonny190/double-take/commit/3365bc78f893081fe69d784e3d6f968d3be561ce))
* frigate snapshot attempts default from 0 to 10 ([423d204](https://github.com/jonny190/double-take/commit/423d204bc3608adf1dee4bef7f62002b26a2d67f))
* **frigate:** sort sub labels alphabetically [#217](https://github.com/jonny190/double-take/issues/217) ([82d8736](https://github.com/jonny190/double-take/commit/82d8736825b428b2b74385975961233d167db294))
* **frigate:** stop_on_match config option to break process loop ([4b98990](https://github.com/jonny190/double-take/commit/4b9899077c74da601fa5d497c929c264e8c03fa6))
* **ha addon:** ability to change STORAGE_PATH, CONFIG_PATH, SECRETS_PATH, MEDIA_PATH ([e5adba4](https://github.com/jonny190/double-take/commit/e5adba4147e5e14fb6148d74270e2c55a8db99e4))
* hass.io add-on support ([724c076](https://github.com/jonny190/double-take/commit/724c0765a106147126edde002ea35defeb335d7d))
* include reasons why image was a miss on matches page ([#90](https://github.com/jonny190/double-take/issues/90)) ([f5e220b](https://github.com/jonny190/double-take/commit/f5e220bd923b7e9621b7063aafacacf790dbb342))
* include version on config page with ability to copy ([029bfea](https://github.com/jonny190/double-take/commit/029bfeaf9d44859a91e05eaef989c8c6dbd34fcf))
* log level support ([#84](https://github.com/jonny190/double-take/issues/84)) ([5f91b83](https://github.com/jonny190/double-take/commit/5f91b83d8df22d410dd6895c3d78f1c04e4793cd))
* **mqtt & api:** total count for person, match, miss, and unknown ([#223](https://github.com/jonny190/double-take/issues/223)) ([2bf4406](https://github.com/jonny190/double-take/commit/2bf4406aa7e92b1b255e95475b5393d7345207e4))
* **opencv:** adjust classifier settings via config ([2e6c512](https://github.com/jonny190/double-take/commit/2e6c5129b445b2eca8b884af8d95fc2ceb19733d))
* pagination and filtering on all matches + refactoring ([af30071](https://github.com/jonny190/double-take/commit/af300715852b8a9717c86e8bd30538607f1042ce))
* publish errors to mqtt topic ([#52](https://github.com/jonny190/double-take/issues/52)) ([01a2d6c](https://github.com/jonny190/double-take/commit/01a2d6cfa5fac13425dc555edc9b680a951537b9))
* publish person count to camera topics ([27fb51b](https://github.com/jonny190/double-take/commit/27fb51b30246911ac9f1df5b6f727ace544f12eb))
* redact secrets and keys from logs ([0f3ef02](https://github.com/jonny190/double-take/commit/0f3ef0274deda4e2b15de0ac2137c0e131cb0d55))
* schedule to disable recognition ([#115](https://github.com/jonny190/double-take/issues/115)) ([84235d3](https://github.com/jonny190/double-take/commit/84235d38c243a33bd67946f764d698acf81e530f))
* secrets.yml support ([#170](https://github.com/jonny190/double-take/issues/170)) ([53b11c8](https://github.com/jonny190/double-take/commit/53b11c816a769d6085e629ca3f7c0c4f9c975ea3))
* sockets for live reloading ([50fef76](https://github.com/jonny190/double-take/commit/50fef76ac6cc8a43c22912d0725117f933d60e71))
* support digest auth ([#128](https://github.com/jonny190/double-take/issues/128)) ([eebb792](https://github.com/jonny190/double-take/commit/eebb7923f50fbdd99cb38daae963d14a71bb5170))
* support for compreface mask plugin ([#85](https://github.com/jonny190/double-take/issues/85)) ([7951524](https://github.com/jonny190/double-take/commit/795152451943d0d55a1f778365a7fad23fe62934))
* support for deepstack api key ([45d635f](https://github.com/jonny190/double-take/commit/45d635fc667e0c636dd18c6dfdf887ff2bcde7f7))
* support for gotify notification service ([05da9c3](https://github.com/jonny190/double-take/commit/05da9c3bf7b2c5d3165865a670c661e42eea3346))
* support for home assistant mqtt auto discovery [#38](https://github.com/jonny190/double-take/issues/38) ([d105843](https://github.com/jonny190/double-take/commit/d105843d5f3c8ddc6da090af28a37b2d163fd916))
* support for MQTT TLS ([#241](https://github.com/jonny190/double-take/issues/241)) ([7f37b78](https://github.com/jonny190/double-take/commit/7f37b78d45f879d782d493595d76a14dbd31b7b5))
* support for multiple frigate urls and topics ([4ead9f7](https://github.com/jonny190/double-take/commit/4ead9f7562e6ab82fe93909f47dbe50aa0aba624))
* support ui base path ([#166](https://github.com/jonny190/double-take/issues/166)) ([b1d06aa](https://github.com/jonny190/double-take/commit/b1d06aafb424bb05f5d0f3271910a6a2059b2cb8))
* **train:** pagination ([f749437](https://github.com/jonny190/double-take/commit/f749437e8bb4c666472799c088939705dc416cab))
* ui: add navigation bar to pages ([e9d573b](https://github.com/jonny190/double-take/commit/e9d573bc42fa96ae0a2e0560fdb4d373078366ea))
* **ui:config:** double take status is determined by sockets ([65d094f](https://github.com/jonny190/double-take/commit/65d094fe8376db828bba802eca7f35206ec8cba7))
* **ui:config:** frigate version and last event in tooltip ([cddbebc](https://github.com/jonny190/double-take/commit/cddbebc9b81ebf1d262e433340ab93aed4254852))
* **ui:config:** pull to refresh ([57af9d5](https://github.com/jonny190/double-take/commit/57af9d5b8dfae9b300976c7005ec719e19665c0f))
* **ui:menu:** speed dial action buttons ([8282320](https://github.com/jonny190/double-take/commit/82823207960bf0e0a3831c60ff46c9a045859219))
* **ui:password:** ability to change password ([3008482](https://github.com/jonny190/double-take/commit/3008482872205f9e23d5853dab6ffce8f6b9f4c1))
* **ui:status:** frigate last camera in tooltip ([ac9c7a8](https://github.com/jonny190/double-take/commit/ac9c7a8d8d27b2e30fa32da1c8665dc291d1ef8d))
* **ui:** add double take update checker ([342c181](https://github.com/jonny190/double-take/commit/342c18126c254bd5ac4d1227be56f2b76b06a903))
* **ui:** add login page ([c6469d2](https://github.com/jonny190/double-take/commit/c6469d2ece98ebe0253c54253a68051eacc47dca))
* **ui:** add token page ([28b62e5](https://github.com/jonny190/double-take/commit/28b62e598baf03d5e34665db6971cd255689aee6))
* **ui:** camera and event type filters ([#106](https://github.com/jonny190/double-take/issues/106)) ([c914308](https://github.com/jonny190/double-take/commit/c91430843587291974627138b8370bdb9db61632))
* **ui:** change ui and editor theme via config ([5d6d123](https://github.com/jonny190/double-take/commit/5d6d123665f0227810e610f89afe3800d79b64f7))
* **ui:** config service tooltips ([324b9cb](https://github.com/jonny190/double-take/commit/324b9cbf44f75942db78fc3f38cd3be83a0b93aa))
* **ui:** enable/disable sockets on matches page ([bb95e0a](https://github.com/jonny190/double-take/commit/bb95e0a0ff20c9e11f3a28b2405ccdf2d35b763a))
* **ui:** format tooltips times ([aee36d8](https://github.com/jonny190/double-take/commit/aee36d8b8d1d32a282ee85cc6c1bf0832be8ed9e))
* **ui:** log page for viewing / clearing log file ([#113](https://github.com/jonny190/double-take/issues/113)) ([2ab8d14](https://github.com/jonny190/double-take/commit/2ab8d146461a2703f880be01367e4bdef0c15b13))
* **ui:** mqtt status on config page ([7b3b425](https://github.com/jonny190/double-take/commit/7b3b42597ed52fb4f86924cc56142f4eedc9f3dd))
* **ui:** pull to refresh on matches and training pages ([80aa5a8](https://github.com/jonny190/double-take/commit/80aa5a87942cc5045e2fe68b5472efac10eec053))
* **ui:** show config errors ([ddcaf89](https://github.com/jonny190/double-take/commit/ddcaf897ba7f35ac65a6a86a71cbd56a1a9a2a46))
* **ui:** upload images to process with detectors ([f774406](https://github.com/jonny190/double-take/commit/f774406b540df8ff0eec8b247fee4bd3e02579e1))
* work in progress of camera level config ([#57](https://github.com/jonny190/double-take/issues/57)) ([b27251d](https://github.com/jonny190/double-take/commit/b27251df882095f6b65e629b2735a9c5f53132f1))


### Bug Fixes

* account for misses in camera person count ([561ec5c](https://github.com/jonny190/double-take/commit/561ec5c2998af1502eec82a31c751394f7b9a1e8))
* add auth middleware to filters route ([d25c1fd](https://github.com/jonny190/double-take/commit/d25c1fd5baa53cee28990f3b1e999aa73bd08914))
* add auth token to saveURLs function ([#70](https://github.com/jonny190/double-take/issues/70)) ([bb86315](https://github.com/jonny190/double-take/commit/bb863156717c807c16f2de45c02a719165bd888a))
* add auth token to saveURLs function ([#70](https://github.com/jonny190/double-take/issues/70)) ([167758f](https://github.com/jonny190/double-take/commit/167758f1c2a0d9ad71fb47bd02e16235716434cf))
* add helper function to obtain network ip ([1cf7924](https://github.com/jonny190/double-take/commit/1cf7924a019ee72b430afd6e6b33fa5d4755408c))
* add image to gotify message ([86c9dce](https://github.com/jonny190/double-take/commit/86c9dce83941df0a5b864cfcb9b3df55b233be47))
* add metadata to images for orientation when displaying ([8277f77](https://github.com/jonny190/double-take/commit/8277f77108093a678016a3a011edecc323825b74))
* add missing get.trained util ([1fde7e0](https://github.com/jonny190/double-take/commit/1fde7e0c7e8467b0050da28cef93a8c0d7bd9097))
* add retain flag to double-take/available topic ([9fb35f0](https://github.com/jonny190/double-take/commit/9fb35f0927b56869f45055cc98efa478096bb04c))
* add support for multiple training uploads ([#77](https://github.com/jonny190/double-take/issues/77)) ([142b3f7](https://github.com/jonny190/double-take/commit/142b3f7ec39a11e63327dc50a2081407ab023e6f))
* adjust sub header show position ([fd74c5b](https://github.com/jonny190/double-take/commit/fd74c5b454492edf729342c71b9588640419f1c0))
* allow SNAPSHOT_RETRIES and LATEST_RETRIES to be set to 0 ([24782ed](https://github.com/jonny190/double-take/commit/24782ed001bfed35790e14b577cb90f6876a4fda))
* **api:train:** validate mime type and result of database.get.fileByFilename ([#123](https://github.com/jonny190/double-take/issues/123)) ([d5e050f](https://github.com/jonny190/double-take/commit/d5e050fa708b500f97f2babde5b7256d08bea426))
* **api:** add rate limiting to filesystem/storage routes ([d140d9f](https://github.com/jonny190/double-take/commit/d140d9fcbb1dbee54c2c19bca158e15f140dadf1))
* **api:** catch facebox error before normalizing data ([67c93c4](https://github.com/jonny190/double-take/commit/67c93c4ce10d35efb6f678841c867dc0cc7a71cc))
* **api:** catch heartbeat error ([f085dad](https://github.com/jonny190/double-take/commit/f085dad9be4293e382875e06bb345d3c404cdff3))
* **api:** delete orphaned db records when deleting training folder / files ([f031545](https://github.com/jonny190/double-take/commit/f031545b15b6193e6e4c15a73222f2593c26e265))
* **api:** delete tmp file after processing ([#76](https://github.com/jonny190/double-take/issues/76)) ([189216b](https://github.com/jonny190/double-take/commit/189216bfe001eae568974d427636d913026db330))
* **api:** patch SQL injection, path traversal, and CI issues ([1e504dc](https://github.com/jonny190/double-take/commit/1e504dce88ce8b2ecd450a16e1f568a612dd8f60))
* **api:** publish camera mqtt topic for misses ([#125](https://github.com/jonny190/double-take/issues/125)) ([cb3fb22](https://github.com/jonny190/double-take/commit/cb3fb228412161e53991182e119be56582aca7b3))
* **api:** safely serialize values to prevent XSS ([e11de9d](https://github.com/jonny190/double-take/commit/e11de9dd6b4ea6b7ec9a5607a920d48961e9fa50))
* **api:** save latest images for misses ([62f586c](https://github.com/jonny190/double-take/commit/62f586c761baa45b794ed405df27bbd767b72d0b))
* **api:** sleep if image hasn’t changed during retry loop ([78e9808](https://github.com/jonny190/double-take/commit/78e98082d7e0e77d5c23465cc629b38d9b178a27))
* **api:** validate content type to allow for extra strings from Hikvision cameras ([#127](https://github.com/jonny190/double-take/issues/127)) ([db7d58f](https://github.com/jonny190/double-take/commit/db7d58f1616d437d97a7433e7aa7eaa33e44d5d8))
* **api:** verify www-authenticate header exists ([cd78efe](https://github.com/jonny190/double-take/commit/cd78efe6671d3a7f1acebc85ac1f57bb36b3f2ad))
* better error handling when training fails to prevent stuck loading bar ([07dfd25](https://github.com/jonny190/double-take/commit/07dfd250fdc357574dc45eca51e2ce2060a5c69f))
* better error handling when training fails to prevent stuck loading bar ([c31fe55](https://github.com/jonny190/double-take/commit/c31fe55b9b3fe71e6ac970529dc32edeff35ccd5)), closes [#71](https://github.com/jonny190/double-take/issues/71)
* better handling of new filters ([3fffa6e](https://github.com/jonny190/double-take/commit/3fffa6e04b41fa14b3c2eba6bbea08cb5c5701ab))
* better handling of update check ([6de1cf1](https://github.com/jonny190/double-take/commit/6de1cf1dca9e7f244a4242c3c540ef464824bbc3))
* better support of jpg images for thumbnails/box ([#156](https://github.com/jonny190/double-take/issues/156)) ([04e7d83](https://github.com/jonny190/double-take/commit/04e7d83b6317ac26cb58fb0636544f370adbf257))
* button alignment on train toolbar ([c9b38ce](https://github.com/jonny190/double-take/commit/c9b38ce9134abeb87e2c74edace8660423d4e180))
* call for new matches on paginated page after loading is set to false ([231ac12](https://github.com/jonny190/double-take/commit/231ac128f964028a4403395e373b210012e0a607))
* catch deepstack error in normalizer ([e594808](https://github.com/jonny190/double-take/commit/e5948084d9702d7bf4beddbb6d80f4056f414d19))
* catch empty cameras config ([e6f715f](https://github.com/jonny190/double-take/commit/e6f715f0cdfc0c02930001dd3a1dba811be624a0))
* catch errors from recognize/test ([51629d3](https://github.com/jonny190/double-take/commit/51629d3f970c4458cc472f5738701dc4ccc8c062))
* catch get-orientation errors ([d1ca17d](https://github.com/jonny190/double-take/commit/d1ca17d1215a204f4d765476d42a43868accb5ad))
* catch if paginated page has no results and return to page 1 ([713be92](https://github.com/jonny190/double-take/commit/713be926a3fa4c1aa686f2afc64a45809ac4f0e2))
* catch invalid config on save before writing file ([#94](https://github.com/jonny190/double-take/issues/94)) ([e4503e8](https://github.com/jonny190/double-take/commit/e4503e86082e5c182a40801cf542c59abcfa586c))
* catch when time format is null ([#98](https://github.com/jonny190/double-take/issues/98)) ([ed872dd](https://github.com/jonny190/double-take/commit/ed872dd4dbc7f85c6a6c2232bf5bf5d7362997c3))
* change cameraTopics from string to function ([5c975d4](https://github.com/jonny190/double-take/commit/5c975d4e063944dfb69a59706a1748948aea1cdb))
* change lenna test image from png to jpg ([c039f98](https://github.com/jonny190/double-take/commit/c039f9875e1b0fc9e5fc7dc287a6a6a69d43fa38))
* change polling of github api to once per minute ([e58e798](https://github.com/jonny190/double-take/commit/e58e798b57d4811d00ee998d78f0a8a5a195aaed))
* change trigger for if update is available ([346fcc1](https://github.com/jonny190/double-take/commit/346fcc159e45c7cb647ea8e086e1ee5f652bdf44))
* change url validation method from head to get ([#53](https://github.com/jonny190/double-take/issues/53)) ([a8a4ca2](https://github.com/jonny190/double-take/commit/a8a4ca240bb430781b2c883185d7f63b97afab8a))
* check for first number in status to determine if file is trained or untrained ([125f96e](https://github.com/jonny190/double-take/commit/125f96e2d7eba324a98b14000367ec310b631459))
* check frigate cameras before processing mqtt snapshot ([#49](https://github.com/jonny190/double-take/issues/49)) ([93246fc](https://github.com/jonny190/double-take/commit/93246fc305d23eb0a6708ddd38fc6fcbeac33602))
* check to see if config.yml exists before creating it ([ccbc6ec](https://github.com/jonny190/double-take/commit/ccbc6ecfcba2b758e825ea6caa952ebfde1655ef))
* clean /tmp files after processing and remove all on restarts [#76](https://github.com/jonny190/double-take/issues/76) ([a5c761f](https://github.com/jonny190/double-take/commit/a5c761fc01f4d524a45b139d4539d6d85eb4d505))
* clean mqtt /tmp files after processing [#76](https://github.com/jonny190/double-take/issues/76) ([b6478ce](https://github.com/jonny190/double-take/commit/b6478ce9e3c50ba9302e1179c2a7951fae51c8be))
* clear disabled array ([dd84f85](https://github.com/jonny190/double-take/commit/dd84f85ebbdd62f1beeec7252e313ee9f99390ee))
* define default value for error ([5f27099](https://github.com/jonny190/double-take/commit/5f27099360c6616fb69385ad0081d4962906c07d))
* delete tmp masked images ([#208](https://github.com/jonny190/double-take/issues/208)) ([c6b40c5](https://github.com/jonny190/double-take/commit/c6b40c5293b5805477ea6125e4d1496953c06559))
* det_prob_threshold in compreface detector test ([#185](https://github.com/jonny190/double-take/issues/185)) ([439179a](https://github.com/jonny190/double-take/commit/439179acd0e2c8f2c458de7604ff1eb817d08df2))
* don't delete matched photos until after they are moved ([d255708](https://github.com/jonny190/double-take/commit/d255708a49fb5991803d8f79af23285165f8ee94))
* don't reprocess if no detectors configured ([157e7c7](https://github.com/jonny190/double-take/commit/157e7c78f9428564278916833da919d95958dccc))
* don't reset filters when all results on page are deleted ([#106](https://github.com/jonny190/double-take/issues/106)) ([bf5ebac](https://github.com/jonny190/double-take/commit/bf5ebacd05ff66113886056ec58f34c9a30f4d1f))
* **frigate:** check for camera name in zones during name check ([e7a66c8](https://github.com/jonny190/double-take/commit/e7a66c898e7dae999ec950a74f111b86a1c1a2f2))
* if compreface finds a face but no name matches, count it as a miss ([60c47dc](https://github.com/jonny190/double-take/commit/60c47dc62f11aab694041c3a1229e578d4826f22))
* include auth token when enabled for mqtt processing ([5ae3dbc](https://github.com/jonny190/double-take/commit/5ae3dbcb6fbf029f42037bacc8d52e843e78e7f2))
* include unique_id and prefix for HA MQTT discovery [#38](https://github.com/jonny190/double-take/issues/38) ([fec114e](https://github.com/jonny190/double-take/commit/fec114e135bc3d6e39c607e693da3216c4255298))
* loop through compreface plugin results on ui ([83cea24](https://github.com/jonny190/double-take/commit/83cea249f250ae2a4d3512d9360e5de157cb55ed))
* lowercase camera name in mqtt topics ([#163](https://github.com/jonny190/double-take/issues/163)) ([57e605b](https://github.com/jonny190/double-take/commit/57e605bc911c96f169c3f524476b60e67710303d))
* match filename ([36bca73](https://github.com/jonny190/double-take/commit/36bca73378bf8756a8fc4a1c639777810747112f))
* **mqtt:** don't publish message if client isn't connected ([5901ebe](https://github.com/jonny190/double-take/commit/5901ebef1bbe9992c08ee315e9c9fceb496db662))
* **mqtt:** only retain state and configuration, not events. ([#249](https://github.com/jonny190/double-take/issues/249)) ([d5de0ee](https://github.com/jonny190/double-take/commit/d5de0ee8fb60229aa1cf0d4ad974e72009afbff7))
* notify pre-checks ([434d5b4](https://github.com/jonny190/double-take/commit/434d5b4a61a1792c74b3c685e5799fd97ab16b55))
* only pass deepstack api key if configured ([2648280](https://github.com/jonny190/double-take/commit/26482807339bfe4e87c14488bf833effb1517647))
* **opencv:** gracefully fail on error ([84ac482](https://github.com/jonny190/double-take/commit/84ac482a726012886a6658e5737ff748dce9abd3))
* optional chaining for frigate url ([68a9032](https://github.com/jonny190/double-take/commit/68a9032562e77f441e2986e2e931d912b969f4c2))
* pass auth token on /cameras route to recognize endpoint ([2e940bf](https://github.com/jonny190/double-take/commit/2e940bf39958e8498064185d1b2a9218ea283146))
* pass authorization for frigate latest/snapshot events ([0fb3089](https://github.com/jonny190/double-take/commit/0fb30896163504d3b730ce965ba83e2f28ff7920))
* pass camera name when reprocessing image ([cbe7a57](https://github.com/jonny190/double-take/commit/cbe7a57907b2bc3148b7d523b03b240d3daa224a))
* pass orignal frigate event type to frigate util ([7b51a5c](https://github.com/jonny190/double-take/commit/7b51a5c9cc8f29f7037e4fb322a0e2ebd7ce4c83))
* pass upcoming filename to start function to use in response ([32f0bae](https://github.com/jonny190/double-take/commit/32f0bae40ffd1c4e48d9bc31117cb7f618c549fc))
* prevent pagination changes if api is loading ([c767aae](https://github.com/jonny190/double-take/commit/c767aaed927e70e993ec42fdeaa1e81fb2dbabbb))
* prevent password from being changed if auth is disabled ([342bb0c](https://github.com/jonny190/double-take/commit/342bb0c0c93e37bced3cfecee9820dd6af4f3780))
* prevent token page from being viewed if auth is disabled ([e54329d](https://github.com/jonny190/double-take/commit/e54329da2f96f94bb155b4a82d5198315f0d9eed))
* proxy frigate status check through api for docker dns resolution ([a27321c](https://github.com/jonny190/double-take/commit/a27321c31842ca3f19e9d72e0d2b783cccf77dd5))
* remove non alphanumeric characters from MQTT topic names ([#239](https://github.com/jonny190/double-take/issues/239)) ([885d8a1](https://github.com/jonny190/double-take/commit/885d8a112ae34e0f5632f3012a4ed63851cfa2ac))
* replace image-size with probe-image-size ([5b7816a](https://github.com/jonny190/double-take/commit/5b7816a78cba2e4502266140506157215ec6b289))
* replace spaces in names for mqtt publishing ([126274d](https://github.com/jonny190/double-take/commit/126274d97f5bec1fd1bda871b2d1c1c6f6c5e0e3))
* reset home assistant camera topic person count after 30sec ([e1285e6](https://github.com/jonny190/double-take/commit/e1285e64ae1322f4faf03a8adf28bc8c970ff818))
* reset select all button on new api requests ([c741eed](https://github.com/jonny190/double-take/commit/c741eed33631fbbcc19f44e1c80fb27f5f16ac6d))
* return training folders on train/manage dropdowns ([9b9ba7e](https://github.com/jonny190/double-take/commit/9b9ba7e8d95cbfd0a9f0dc9c1f255cd3dce371b0))
* return untrained files for detectors that were never untrained before removed from config ([3bdfc3d](https://github.com/jonny190/double-take/commit/3bdfc3dee773ad6ccc6c6cb3729679eedb63301a))
* sanpshot mask check ([56f3ea6](https://github.com/jonny190/double-take/commit/56f3ea6c40cbe1f2312fd2d5a32ee13ff245dedd))
* saving match images ([14ea798](https://github.com/jonny190/double-take/commit/14ea798304d2dea8fcea0f8e4e2e1d7a4fecea21))
* toggle all when a match was disabled ([d40cb8e](https://github.com/jonny190/double-take/commit/d40cb8ee070d1e2d633df1f3e83cdeea055cdcc5))
* toggleAllSelected hiding images ([f9c2856](https://github.com/jonny190/double-take/commit/f9c2856906fb3c6653bfabdd31abaf522d90f0b6))
* ui: size config height on mount and set tab size to 2 ([c0ea77f](https://github.com/jonny190/double-take/commit/c0ea77fc4832291b43c1bc1709c5bb636861f637))
* **ui:config:** fix event listener for resize window ([9828387](https://github.com/jonny190/double-take/commit/982838706b862c6813cc73e50ffbf2ee0c28480c))
* **ui:config:** remove frigate status on restart ([6dcd80f](https://github.com/jonny190/double-take/commit/6dcd80f496e3a422bfa26b3ca18b578887569186))
* **ui:config:** verify detectors are present ([495a922](https://github.com/jonny190/double-take/commit/495a9220cbe8a35a5d478d738b836ad4a03a095d))
* **ui:editor:** keyboard shortcut now triggers search box ([5f1753c](https://github.com/jonny190/double-take/commit/5f1753cecd7a7ea50a9b2b45c2761e6b3d281ba8))
* **ui:** areAllSelected state header button ([30d7369](https://github.com/jonny190/double-take/commit/30d7369ec3065cfc7db134daa99a6729ac621625))
* **ui:** don't show update icon if last run was from CodeQL ([8d258ea](https://github.com/jonny190/double-take/commit/8d258ea7371334ce0648bb4e16b0ebb74c5225d2))
* **ui:** fix multiselect dropdowns when open and scrolling ([ae2085b](https://github.com/jonny190/double-take/commit/ae2085bf8d9b04bdaead3bf40c10f63cc9eaea7b))
* **ui:** only reset disabled array when new images come in ([bd20f67](https://github.com/jonny190/double-take/commit/bd20f678a393f77fd2165cd9c58a0b09cac6fd6e))
* **ui:** remove frigate status icon if removed after displayed ([f01c735](https://github.com/jonny190/double-take/commit/f01c7355c692a67ea653439e169bd3b50f01cc66))
* **ui:** theme wouldn't load if setting to same theme ([88b0976](https://github.com/jonny190/double-take/commit/88b097621c0d6bce9c90059d470723dfcbe5ace1))
* **ui:** update check logic ([b6e7ffc](https://github.com/jonny190/double-take/commit/b6e7ffc86e9bf6d25307cb814a04a378dcd48998))
* **ui:** update pagination and dropdown totals when deleting matches ([77e63f4](https://github.com/jonny190/double-take/commit/77e63f420b2134091c03217775638deeb4ccad9e))
* update respond middleware to use res.customStatusCode instead of native res.statusCode ([caf6a89](https://github.com/jonny190/double-take/commit/caf6a891d682f8d8afcc7ede9a1158b93aee21a9))
* use exec command when starting api ([2b6bf45](https://github.com/jonny190/double-take/commit/2b6bf45577c59890e756bacf96747389457ccc74))
* use HTTPSuccess for test controller response ([9bcf8fa](https://github.com/jonny190/double-take/commit/9bcf8faa65ea4f0c1b5451c08bfeba6d30e836e6))
* use lower compreface det_prob_threshold for /recognize/test ([#136](https://github.com/jonny190/double-take/issues/136)) ([6a0c435](https://github.com/jonny190/double-take/commit/6a0c43535e1871edfa8478fa64124a016550283f))
* use window.location.origin for /train/add image urls ([e9e6c29](https://github.com/jonny190/double-take/commit/e9e6c2918f3d37c0e5f4df6146bee651e1264877))
* watch legacy config location for restart ([1754371](https://github.com/jonny190/double-take/commit/175437177b068c61ebfe314748eb80cdb4d5dd49))


### Build

* --no-git-tag-version ([2f6323a](https://github.com/jonny190/double-take/commit/2f6323ad83d2901c931f3068defff1050d891dde))
* 0.10.2 ([b479f39](https://github.com/jonny190/double-take/commit/b479f3953d490d9ecc8b79ede8f3daeadd6d5bb8))
* 1.2.0 ([9a6a1ec](https://github.com/jonny190/double-take/commit/9a6a1ec10915e34a14e2fe6350711039053fab76))
* add NODE_ENV to containers ([9c8560d](https://github.com/jonny190/double-take/commit/9c8560dbcfb16e22a4ebf890a64b412ea6dacced))
* add sha-7 to version for build ([e620135](https://github.com/jonny190/double-take/commit/e620135db9ac290e63663faae581e834f4c491dc))
* copy .eslintrc.js during build process ([a89db5c](https://github.com/jonny190/double-take/commit/a89db5c3f9b4c1f2cfb147c78b50d83d1acae3f1))
* **deps:** bump outdated packages ([0842d98](https://github.com/jonny190/double-take/commit/0842d987de25c2a5495cafe73967d30bc96bbe8b))
* **deps:** package updates ([f2936f6](https://github.com/jonny190/double-take/commit/f2936f6beaac37fc5c788207c4e88fb3e98a7a06))
* **deps:** update packages ([dc2b5e4](https://github.com/jonny190/double-take/commit/dc2b5e48e5c9c52b1df6045fbef7090b9c627b7c))
* eslint is required dev dependency for vue build ([3ae139f](https://github.com/jonny190/double-take/commit/3ae139f1f34835a9decb2232b5b2d6de4cab4052))
* **frontend:** migrate from vue-cli to Vite ([25a9906](https://github.com/jonny190/double-take/commit/25a9906991351885cdce91c6de4a6da7a06716db))
* **frontend:** migrate to PrimeVue 4 ([b71bc23](https://github.com/jonny190/double-take/commit/b71bc234b45b21692e680cf3c01c8f287e9da9c3))
* include ace-builds package for editor themes and modes ([a730dc6](https://github.com/jonny190/double-take/commit/a730dc6915434585c2361584cab3a372e2185e73))
* include babel.config.js for frontend building ([bbafc2b](https://github.com/jonny190/double-take/commit/bbafc2bb914bc157f32f20ee7e23044800b5c980))
* local development with docker-compose ([c3f92e5](https://github.com/jonny190/double-take/commit/c3f92e5c81b90c685ac443feaa1e23873c8b749b))
* lock versions ([9ba932e](https://github.com/jonny190/double-take/commit/9ba932edbef2088504427a4db16a733299b85950))
* multer for file uploads ([fcf406b](https://github.com/jonny190/double-take/commit/fcf406b3bd13a727653b4d412b6d48129e48526a))
* node 16 ([6cecc36](https://github.com/jonny190/double-take/commit/6cecc365fab1de70fc642770a7f4680f189fecbc))
* package audit ([183d6bc](https://github.com/jonny190/double-take/commit/183d6bc4d6b6e0b0384f54f48bc9c906a9dcb08f))
* package bump ([7718a7c](https://github.com/jonny190/double-take/commit/7718a7ca3b6490a724366f31d8c6cf391cf840e8))
* package update ([a5ef591](https://github.com/jonny190/double-take/commit/a5ef5915ca2487b7ec51090f1b7b9f37b3155376))
* package update ([f9fb611](https://github.com/jonny190/double-take/commit/f9fb611a82393adfb0299261eef3a8c563fb6b27))
* package update ([0193e56](https://github.com/jonny190/double-take/commit/0193e56c7424525eac40ba2a0a97689b785c319e))
* package update ([cafbf0f](https://github.com/jonny190/double-take/commit/cafbf0f093788913c26ce79e98b5cd3d3ba13c41))
* package updates ([8c038bf](https://github.com/jonny190/double-take/commit/8c038bfce2abab02802fa9c160d8050bb2b97b1b))
* package updates ([8e55953](https://github.com/jonny190/double-take/commit/8e5595360b984a1fecd3aa2b13376308bd03ab83))
* package updates ([db3cfde](https://github.com/jonny190/double-take/commit/db3cfde86da86fea3839306cf4af2ab684e4cb67))
* package updates ([d7876d8](https://github.com/jonny190/double-take/commit/d7876d8f40148d5ae08e8ab5604df3de75affaea))
* package updates ([4d10e31](https://github.com/jonny190/double-take/commit/4d10e318978c17b84fc86c02fabeecb56d668da7))
* package updates ([ac054c5](https://github.com/jonny190/double-take/commit/ac054c586b3c695be67eee5f80b1ba03a293ca51))
* package updates ([24fba50](https://github.com/jonny190/double-take/commit/24fba50350caf2a85ee8946e0dcd9fb6c20a1415))
* package updates ([9d050bb](https://github.com/jonny190/double-take/commit/9d050bbd905d04dbe1324f1d005a9f33c24ad6ec))
* package updates ([0802a85](https://github.com/jonny190/double-take/commit/0802a85f2a65dacd7d3343db0048302dcfa48c6a))
* package updates ([2c6b5c3](https://github.com/jonny190/double-take/commit/2c6b5c3ed06e2c339af89d3e8d52a3d9111fd434))
* package updates ([df26815](https://github.com/jonny190/double-take/commit/df268151a8d343b41ba5b0602a14020117378f93))
* semantic versioning for beta builds ([cc617c9](https://github.com/jonny190/double-take/commit/cc617c98fb4e1c25bdfec6667353dd1b10a953f1))
* update entry command to write config.yml file before nodemon starts ([11353c8](https://github.com/jonny190/double-take/commit/11353c814477fa09250dc4b3caf9739d1e523e3d))
* update root package.json with sha7 version ([f241cd1](https://github.com/jonny190/double-take/commit/f241cd1c314a314be510aaeaef97e3a8bd0ee266))
* use current npm version and not docker version ([20ba5d0](https://github.com/jonny190/double-take/commit/20ba5d0cd338585512e0c38033afbd286012a08a))
* use version from root package.json ([9fb592a](https://github.com/jonny190/double-take/commit/9fb592aa64ce9aa0178418d8d7f3c80974c4c8a8))
* v0.10.1 ([f7c095a](https://github.com/jonny190/double-take/commit/f7c095af208e7cc94c04a92afdb9b4a362506d6e))
* v0.6.2 ([2561e46](https://github.com/jonny190/double-take/commit/2561e46468e0b4f36e1798509f5eab6ad59f032d))
* v0.6.3 ([bd737d2](https://github.com/jonny190/double-take/commit/bd737d28b99debb84833cbbbcda864df6fc0a141))
* v0.7.0 ([9019a10](https://github.com/jonny190/double-take/commit/9019a1039e3c503a38313612d43438f6fdbc68a3))
* v0.9.1 ([43710ad](https://github.com/jonny190/double-take/commit/43710ad4d915f508b077960d6f1594218cc1f2f4))
* v1.0.0 ([4c7be6f](https://github.com/jonny190/double-take/commit/4c7be6fba51470bede8e397e6bb2ba7003c78bb4))
* workflow dispatch [skip ci] ([a4f6e13](https://github.com/jonny190/double-take/commit/a4f6e1393f807622d947635acef8b57b92caa6be))

## [1.13.2](https://github.com/jakowenko/double-take/compare/v1.13.1...v1.13.2) (2025-08-18)


### Bug Fixes

* **api:** safely serialize values to prevent XSS ([e11de9d](https://github.com/jakowenko/double-take/commit/e11de9dd6b4ea6b7ec9a5607a920d48961e9fa50))


### Build

* lock versions ([9ba932e](https://github.com/jakowenko/double-take/commit/9ba932edbef2088504427a4db16a733299b85950))

## [1.13.1](https://github.com/jakowenko/double-take/compare/v1.13.0...v1.13.1) (2022-10-27)


### Bug Fixes

* **mqtt:** only retain state and configuration, not events. ([#249](https://github.com/jakowenko/double-take/issues/249)) ([d5de0ee](https://github.com/jakowenko/double-take/commit/d5de0ee8fb60229aa1cf0d4ad974e72009afbff7))

## [1.13.1-beta.1](https://github.com/jakowenko/double-take/compare/v1.13.0...v1.13.1-beta.1) (2022-10-27)


### Bug Fixes

* **mqtt:** only retain state and configuration, not events. ([#249](https://github.com/jakowenko/double-take/issues/249)) ([d5de0ee](https://github.com/jakowenko/double-take/commit/d5de0ee8fb60229aa1cf0d4ad974e72009afbff7))

## [1.13.0](https://github.com/jakowenko/double-take/compare/v1.12.1...v1.13.0) (2022-10-21)


### Features

* frigate matches below an area target ([3365bc7](https://github.com/jakowenko/double-take/commit/3365bc78f893081fe69d784e3d6f968d3be561ce))
* **mqtt & api:** total count for person, match, miss, and unknown ([#223](https://github.com/jakowenko/double-take/issues/223)) ([2bf4406](https://github.com/jakowenko/double-take/commit/2bf4406aa7e92b1b255e95475b5393d7345207e4))
* support for MQTT TLS ([#241](https://github.com/jakowenko/double-take/issues/241)) ([7f37b78](https://github.com/jakowenko/double-take/commit/7f37b78d45f879d782d493595d76a14dbd31b7b5))


### Bug Fixes

* remove non alphanumeric characters from MQTT topic names ([#239](https://github.com/jakowenko/double-take/issues/239)) ([885d8a1](https://github.com/jakowenko/double-take/commit/885d8a112ae34e0f5632f3012a4ed63851cfa2ac))

## [1.13.0-beta.4](https://github.com/jakowenko/double-take/compare/v1.13.0-beta.3...v1.13.0-beta.4) (2022-10-21)


### Features

* **mqtt & api:** total count for person, match, miss, and unknown ([#223](https://github.com/jakowenko/double-take/issues/223)) ([2bf4406](https://github.com/jakowenko/double-take/commit/2bf4406aa7e92b1b255e95475b5393d7345207e4))

## [1.13.0-beta.3](https://github.com/jakowenko/double-take/compare/v1.13.0-beta.2...v1.13.0-beta.3) (2022-10-20)


### Bug Fixes

* remove non alphanumeric characters from MQTT topic names ([#239](https://github.com/jakowenko/double-take/issues/239)) ([885d8a1](https://github.com/jakowenko/double-take/commit/885d8a112ae34e0f5632f3012a4ed63851cfa2ac))

## [1.13.0-beta.2](https://github.com/jakowenko/double-take/compare/v1.13.0-beta.1...v1.13.0-beta.2) (2022-10-20)


### Features

* support for MQTT TLS ([#241](https://github.com/jakowenko/double-take/issues/241)) ([7f37b78](https://github.com/jakowenko/double-take/commit/7f37b78d45f879d782d493595d76a14dbd31b7b5))

## [1.13.0-beta.1](https://github.com/jakowenko/double-take/compare/v1.12.1...v1.13.0-beta.1) (2022-10-19)


### Features

* frigate matches below an area target ([3365bc7](https://github.com/jakowenko/double-take/commit/3365bc78f893081fe69d784e3d6f968d3be561ce))

## [1.12.1](https://github.com/jakowenko/double-take/compare/v1.12.0...v1.12.1) (2022-06-17)


### Bug Fixes

* **opencv:** gracefully fail on error ([84ac482](https://github.com/jakowenko/double-take/commit/84ac482a726012886a6658e5737ff748dce9abd3))

## [1.12.1-beta.1](https://github.com/jakowenko/double-take/compare/v1.12.0...v1.12.1-beta.1) (2022-06-17)


### Bug Fixes

* **opencv:** gracefully fail on error ([84ac482](https://github.com/jakowenko/double-take/commit/84ac482a726012886a6658e5737ff748dce9abd3))

## [1.12.0](https://github.com/jakowenko/double-take/compare/v1.11.0...v1.12.0) (2022-06-13)


### Features

* **api:** opencv preprocess face check ([ed30ad1](https://github.com/jakowenko/double-take/commit/ed30ad10dfe9f6d104619fa134e2d54698b1c1ff))
* aws rekognition support ([7904852](https://github.com/jakowenko/double-take/commit/79048520fd66cb9c4144db11488558b82c8ada19))
* **detectors:** process images from specific cameras ([5d39d0c](https://github.com/jakowenko/double-take/commit/5d39d0c2c18d0851eccd6a8f698638906b0c36b0))
* **frigate:** sort sub labels alphabetically [#217](https://github.com/jakowenko/double-take/issues/217) ([82d8736](https://github.com/jakowenko/double-take/commit/82d8736825b428b2b74385975961233d167db294))
* **frigate:** stop_on_match config option to break process loop ([4b98990](https://github.com/jakowenko/double-take/commit/4b9899077c74da601fa5d497c929c264e8c03fa6))
* **opencv:** adjust classifier settings via config ([2e6c512](https://github.com/jakowenko/double-take/commit/2e6c5129b445b2eca8b884af8d95fc2ceb19733d))
* **ui:** show config errors ([ddcaf89](https://github.com/jakowenko/double-take/commit/ddcaf897ba7f35ac65a6a86a71cbd56a1a9a2a46))
* **ui:** upload images to process with detectors ([f774406](https://github.com/jakowenko/double-take/commit/f774406b540df8ff0eec8b247fee4bd3e02579e1))


### Bug Fixes

* **api:** sleep if image hasn’t changed during retry loop ([78e9808](https://github.com/jakowenko/double-take/commit/78e98082d7e0e77d5c23465cc629b38d9b178a27))
* better handling of update check ([6de1cf1](https://github.com/jakowenko/double-take/commit/6de1cf1dca9e7f244a4242c3c540ef464824bbc3))


### Build

* **deps:** bump outdated packages ([0842d98](https://github.com/jakowenko/double-take/commit/0842d987de25c2a5495cafe73967d30bc96bbe8b))
* workflow dispatch [skip ci] ([a4f6e13](https://github.com/jakowenko/double-take/commit/a4f6e1393f807622d947635acef8b57b92caa6be))

## [1.12.0-beta.6](https://github.com/jakowenko/double-take/compare/v1.12.0-beta.5...v1.12.0-beta.6) (2022-06-13)


### Features

* **ui:** upload images to process with detectors ([f774406](https://github.com/jakowenko/double-take/commit/f774406b540df8ff0eec8b247fee4bd3e02579e1))

## [1.12.0-beta.5](https://github.com/jakowenko/double-take/compare/v1.12.0-beta.4...v1.12.0-beta.5) (2022-06-12)


### Features

* **opencv:** adjust classifier settings via config ([2e6c512](https://github.com/jakowenko/double-take/commit/2e6c5129b445b2eca8b884af8d95fc2ceb19733d))


### Build

* workflow dispatch [skip ci] ([a4f6e13](https://github.com/jakowenko/double-take/commit/a4f6e1393f807622d947635acef8b57b92caa6be))

## [1.12.0-beta.4](https://github.com/jakowenko/double-take/compare/v1.12.0-beta.3...v1.12.0-beta.4) (2022-06-12)


### Bug Fixes

* better handling of update check ([6de1cf1](https://github.com/jakowenko/double-take/commit/6de1cf1dca9e7f244a4242c3c540ef464824bbc3))

## [1.12.0-beta.3](https://github.com/jakowenko/double-take/compare/v1.12.0-beta.2...v1.12.0-beta.3) (2022-06-12)


### Features

* aws rekognition support ([7904852](https://github.com/jakowenko/double-take/commit/79048520fd66cb9c4144db11488558b82c8ada19))

## [1.12.0-beta.2](https://github.com/jakowenko/double-take/compare/v1.12.0-beta.1...v1.12.0-beta.2) (2022-06-12)


### Features

* **api:** opencv preprocess face check ([ed30ad1](https://github.com/jakowenko/double-take/commit/ed30ad10dfe9f6d104619fa134e2d54698b1c1ff))
* **detectors:** process images from specific cameras ([5d39d0c](https://github.com/jakowenko/double-take/commit/5d39d0c2c18d0851eccd6a8f698638906b0c36b0))
* **frigate:** stop_on_match config option to break process loop ([4b98990](https://github.com/jakowenko/double-take/commit/4b9899077c74da601fa5d497c929c264e8c03fa6))
* **ui:** show config errors ([ddcaf89](https://github.com/jakowenko/double-take/commit/ddcaf897ba7f35ac65a6a86a71cbd56a1a9a2a46))


### Bug Fixes

* **api:** sleep if image hasn’t changed during retry loop ([78e9808](https://github.com/jakowenko/double-take/commit/78e98082d7e0e77d5c23465cc629b38d9b178a27))

## [1.12.0-beta.1](https://github.com/jakowenko/double-take/compare/v1.11.0...v1.12.0-beta.1) (2022-06-06)


### Features

* **frigate:** sort sub labels alphabetically [#217](https://github.com/jakowenko/double-take/issues/217) ([82d8736](https://github.com/jakowenko/double-take/commit/82d8736825b428b2b74385975961233d167db294))


### Build

* **deps:** bump outdated packages ([0842d98](https://github.com/jakowenko/double-take/commit/0842d987de25c2a5495cafe73967d30bc96bbe8b))

## [1.11.0](https://github.com/jakowenko/double-take/compare/v1.10.1...v1.11.0) (2022-05-30)


### Features

* **ha addon:** ability to change STORAGE_PATH, CONFIG_PATH, SECRETS_PATH, MEDIA_PATH ([e5adba4](https://github.com/jakowenko/double-take/commit/e5adba4147e5e14fb6148d74270e2c55a8db99e4))


### Bug Fixes

* **ui:** update check logic ([b6e7ffc](https://github.com/jakowenko/double-take/commit/b6e7ffc86e9bf6d25307cb814a04a378dcd48998))

## [1.11.0-beta.2](https://github.com/jakowenko/double-take/compare/v1.11.0-beta.1...v1.11.0-beta.2) (2022-05-30)


### Bug Fixes

* **ui:** update check logic ([b6e7ffc](https://github.com/jakowenko/double-take/commit/b6e7ffc86e9bf6d25307cb814a04a378dcd48998))

## [1.11.0-beta.1](https://github.com/jakowenko/double-take/compare/v1.10.1...v1.11.0-beta.1) (2022-05-30)


### Features

* **ha addon:** ability to change STORAGE_PATH, CONFIG_PATH, SECRETS_PATH, MEDIA_PATH ([e5adba4](https://github.com/jakowenko/double-take/commit/e5adba4147e5e14fb6148d74270e2c55a8db99e4))

### [1.10.1](https://github.com/jakowenko/double-take/compare/v1.10.0...v1.10.1) (2022-05-25)


### Bug Fixes

* **api:** catch heartbeat error ([f085dad](https://github.com/jakowenko/double-take/commit/f085dad9be4293e382875e06bb345d3c404cdff3))

### [1.10.1-beta.1](https://github.com/jakowenko/double-take/compare/v1.10.0...v1.10.1-beta.1) (2022-05-25)


### Bug Fixes

* **api:** catch heartbeat error ([f085dad](https://github.com/jakowenko/double-take/commit/f085dad9be4293e382875e06bb345d3c404cdff3))

## [1.10.0](https://github.com/jakowenko/double-take/compare/v1.9.0...v1.10.0) (2022-05-24)


### Features

* **config:** anonymous telemetry data used to help deliver new features ([3e35091](https://github.com/jakowenko/double-take/commit/3e3509115b9f250aee62387a6fc34e255e18be22))


### Bug Fixes

* delete tmp masked images ([#208](https://github.com/jakowenko/double-take/issues/208)) ([c6b40c5](https://github.com/jakowenko/double-take/commit/c6b40c5293b5805477ea6125e4d1496953c06559))

## [1.10.0-beta.1](https://github.com/jakowenko/double-take/compare/v1.9.1-beta.1...v1.10.0-beta.1) (2022-05-24)


### Features

* **config:** anonymous telemetry data used to help deliver new features ([3e35091](https://github.com/jakowenko/double-take/commit/3e3509115b9f250aee62387a6fc34e255e18be22))

### [1.9.1-beta.1](https://github.com/jakowenko/double-take/compare/v1.9.0...v1.9.1-beta.1) (2022-05-23)


### Bug Fixes

* delete tmp masked images ([#208](https://github.com/jakowenko/double-take/issues/208)) ([c6b40c5](https://github.com/jakowenko/double-take/commit/c6b40c5293b5805477ea6125e4d1496953c06559))

## [1.9.0](https://github.com/jakowenko/double-take/compare/v1.8.0...v1.9.0) (2022-05-23)


### Features

* **api:** update frigate sub label ([ad40018](https://github.com/jakowenko/double-take/commit/ad40018ddc1319ccf6b3e0d2d98784d35931826d))


### Bug Fixes

* det_prob_threshold in compreface detector test ([#185](https://github.com/jakowenko/double-take/issues/185)) ([439179a](https://github.com/jakowenko/double-take/commit/439179acd0e2c8f2c458de7604ff1eb817d08df2))


### Build

* copy .eslintrc.js during build process ([a89db5c](https://github.com/jakowenko/double-take/commit/a89db5c3f9b4c1f2cfb147c78b50d83d1acae3f1))
* **deps:** package updates ([f2936f6](https://github.com/jakowenko/double-take/commit/f2936f6beaac37fc5c788207c4e88fb3e98a7a06))
* semantic versioning for beta builds ([cc617c9](https://github.com/jakowenko/double-take/commit/cc617c98fb4e1c25bdfec6667353dd1b10a953f1))

## [1.9.0-beta.2](https://github.com/jakowenko/double-take/compare/v1.9.0-beta.1...v1.9.0-beta.2) (2022-05-23)


### Bug Fixes

* det_prob_threshold in compreface detector test ([#185](https://github.com/jakowenko/double-take/issues/185)) ([439179a](https://github.com/jakowenko/double-take/commit/439179acd0e2c8f2c458de7604ff1eb817d08df2))

## [1.9.0-beta.1](https://github.com/jakowenko/double-take/compare/v1.8.0...v1.9.0-beta.1) (2022-05-23)


### Features

* **api:** update frigate sub label ([ad40018](https://github.com/jakowenko/double-take/commit/ad40018ddc1319ccf6b3e0d2d98784d35931826d))


### Build

* copy .eslintrc.js during build process ([a89db5c](https://github.com/jakowenko/double-take/commit/a89db5c3f9b4c1f2cfb147c78b50d83d1acae3f1))
* **deps:** package updates ([f2936f6](https://github.com/jakowenko/double-take/commit/f2936f6beaac37fc5c788207c4e88fb3e98a7a06))
* semantic versioning for beta builds ([cc617c9](https://github.com/jakowenko/double-take/commit/cc617c98fb4e1c25bdfec6667353dd1b10a953f1))

## [1.8.0](https://github.com/jakowenko/double-take/compare/v1.7.0...v1.8.0) (2022-05-20)


### Features

* **api:** zip export of storage directory ([ccae0f9](https://github.com/jakowenko/double-take/commit/ccae0f987e39e7cad0a14fb0562a3bc4c84902fc))


### Build

* **deps:** update packages ([dc2b5e4](https://github.com/jakowenko/double-take/commit/dc2b5e48e5c9c52b1df6045fbef7090b9c627b7c))

# [1.7.0](https://github.com/jakowenko/double-take/compare/v1.6.0...v1.7.0) (2021-11-27)


### Bug Fixes

* better support of jpg images for thumbnails/box ([#156](https://github.com/jakowenko/double-take/issues/156)) ([04e7d83](https://github.com/jakowenko/double-take/commit/04e7d83b6317ac26cb58fb0636544f370adbf257))
* lowercase camera name in mqtt topics ([#163](https://github.com/jakowenko/double-take/issues/163)) ([57e605b](https://github.com/jakowenko/double-take/commit/57e605bc911c96f169c3f524476b60e67710303d))
* optional chaining for frigate url ([68a9032](https://github.com/jakowenko/double-take/commit/68a9032562e77f441e2986e2e931d912b969f4c2))
* use lower compreface det_prob_threshold for /recognize/test ([#136](https://github.com/jakowenko/double-take/issues/136)) ([6a0c435](https://github.com/jakowenko/double-take/commit/6a0c43535e1871edfa8478fa64124a016550283f))


### Features

* ability to change mqtt client_id ([#168](https://github.com/jakowenko/double-take/issues/168)) ([98d7f2a](https://github.com/jakowenko/double-take/commit/98d7f2a89f8a242685fc205d8e5afec7e53e995d))
* **api:** validate config with jsonschema ([ad23c7b](https://github.com/jakowenko/double-take/commit/ad23c7b30af61fdc9157f050de753438792d9028))
* edit secrets.yml from ui ([963cacd](https://github.com/jakowenko/double-take/commit/963cacdf2074f6ccb56bbc9b3ffb0f3db38a53f4))
* secrets.yml support ([#170](https://github.com/jakowenko/double-take/issues/170)) ([53b11c8](https://github.com/jakowenko/double-take/commit/53b11c816a769d6085e629ca3f7c0c4f9c975ea3))
* support ui base path ([#166](https://github.com/jakowenko/double-take/issues/166)) ([b1d06aa](https://github.com/jakowenko/double-take/commit/b1d06aafb424bb05f5d0f3271910a6a2059b2cb8))

# [1.6.0](https://github.com/jakowenko/double-take/compare/v1.5.2...v1.6.0) (2021-10-29)


### Features

* hass.io add-on support ([724c076](https://github.com/jakowenko/double-take/commit/724c0765a106147126edde002ea35defeb335d7d))
* **ui:** config service tooltips ([324b9cb](https://github.com/jakowenko/double-take/commit/324b9cbf44f75942db78fc3f38cd3be83a0b93aa))

## [1.5.2](https://github.com/jakowenko/double-take/compare/v1.5.1...v1.5.2) (2021-10-21)


### Bug Fixes

* **api:** delete tmp file after processing ([#76](https://github.com/jakowenko/double-take/issues/76)) ([189216b](https://github.com/jakowenko/double-take/commit/189216bfe001eae568974d427636d913026db330))

## [1.5.1](https://github.com/jakowenko/double-take/compare/v1.5.0...v1.5.1) (2021-10-19)


### Bug Fixes

* **api:** verify www-authenticate header exists ([cd78efe](https://github.com/jakowenko/double-take/commit/cd78efe6671d3a7f1acebc85ac1f57bb36b3f2ad))

# [1.5.0](https://github.com/jakowenko/double-take/compare/v1.4.1...v1.5.0) (2021-10-16)


### Bug Fixes

* **api:** validate content type to allow for extra strings from Hikvision cameras ([#127](https://github.com/jakowenko/double-take/issues/127)) ([db7d58f](https://github.com/jakowenko/double-take/commit/db7d58f1616d437d97a7433e7aa7eaa33e44d5d8))
* **ui:** update pagination and dropdown totals when deleting matches ([77e63f4](https://github.com/jakowenko/double-take/commit/77e63f420b2134091c03217775638deeb4ccad9e))


### Features

* frigate snapshot attempts default from 0 to 10 ([423d204](https://github.com/jakowenko/double-take/commit/423d204bc3608adf1dee4bef7f62002b26a2d67f))
* support digest auth ([#128](https://github.com/jakowenko/double-take/issues/128)) ([eebb792](https://github.com/jakowenko/double-take/commit/eebb7923f50fbdd99cb38daae963d14a71bb5170))

## [1.4.1](https://github.com/jakowenko/double-take/compare/v1.4.0...v1.4.1) (2021-10-13)


### Bug Fixes

* account for misses in camera person count ([561ec5c](https://github.com/jakowenko/double-take/commit/561ec5c2998af1502eec82a31c751394f7b9a1e8))
* **api:** publish camera mqtt topic for misses ([#125](https://github.com/jakowenko/double-take/issues/125)) ([cb3fb22](https://github.com/jakowenko/double-take/commit/cb3fb228412161e53991182e119be56582aca7b3))
* **api:** save latest images for misses ([62f586c](https://github.com/jakowenko/double-take/commit/62f586c761baa45b794ed405df27bbd767b72d0b))
* **ui:** don't show update icon if last run was from CodeQL ([8d258ea](https://github.com/jakowenko/double-take/commit/8d258ea7371334ce0648bb4e16b0ebb74c5225d2))

# [1.4.0](https://github.com/jakowenko/double-take/compare/v1.3.0...v1.4.0) (2021-10-12)


### Bug Fixes

* **api:train:** validate mime type and result of database.get.fileByFilename ([#123](https://github.com/jakowenko/double-take/issues/123)) ([d5e050f](https://github.com/jakowenko/double-take/commit/d5e050fa708b500f97f2babde5b7256d08bea426))
* **api:** catch facebox error before normalizing data ([67c93c4](https://github.com/jakowenko/double-take/commit/67c93c4ce10d35efb6f678841c867dc0cc7a71cc))
* **api:** delete orphaned db records when deleting training folder / files ([f031545](https://github.com/jakowenko/double-take/commit/f031545b15b6193e6e4c15a73222f2593c26e265))
* **ui:** fix multiselect dropdowns when open and scrolling ([ae2085b](https://github.com/jakowenko/double-take/commit/ae2085bf8d9b04bdaead3bf40c10f63cc9eaea7b))
* **ui:** theme wouldn't load if setting to same theme ([88b0976](https://github.com/jakowenko/double-take/commit/88b097621c0d6bce9c90059d470723dfcbe5ace1))


### Features

* **api:** api/latest/<name>.jpg ([#120](https://github.com/jakowenko/double-take/issues/120)) ([cd765ae](https://github.com/jakowenko/double-take/commit/cd765ae39067221687a1ba3c72b7f2c92e8d5c46))
* **api:** use camera name when using custom mqtt topic ([70a4ce3](https://github.com/jakowenko/double-take/commit/70a4ce3d0b6d22eb0619b31a65616b84beba7f98))
* **ui:** enable/disable sockets on matches page ([bb95e0a](https://github.com/jakowenko/double-take/commit/bb95e0a0ff20c9e11f3a28b2405ccdf2d35b763a))

# [1.3.0](https://github.com/jakowenko/double-take/compare/v1.2.0...v1.3.0) (2021-10-06)


### Features

* schedule to disable recognition ([#115](https://github.com/jakowenko/double-take/issues/115)) ([84235d3](https://github.com/jakowenko/double-take/commit/84235d38c243a33bd67946f764d698acf81e530f))
* **ui:config:** double take status is determined by sockets ([65d094f](https://github.com/jakowenko/double-take/commit/65d094fe8376db828bba802eca7f35206ec8cba7))
* **ui:config:** frigate version and last event in tooltip ([cddbebc](https://github.com/jakowenko/double-take/commit/cddbebc9b81ebf1d262e433340ab93aed4254852))
* **ui:config:** pull to refresh ([57af9d5](https://github.com/jakowenko/double-take/commit/57af9d5b8dfae9b300976c7005ec719e19665c0f))
* **ui:menu:** speed dial action buttons ([8282320](https://github.com/jakowenko/double-take/commit/82823207960bf0e0a3831c60ff46c9a045859219))
* **ui:status:** frigate last camera in tooltip ([ac9c7a8](https://github.com/jakowenko/double-take/commit/ac9c7a8d8d27b2e30fa32da1c8665dc291d1ef8d))
* **ui:** format tooltips times ([aee36d8](https://github.com/jakowenko/double-take/commit/aee36d8b8d1d32a282ee85cc6c1bf0832be8ed9e))
* **ui:** pull to refresh on matches and training pages ([80aa5a8](https://github.com/jakowenko/double-take/commit/80aa5a87942cc5045e2fe68b5472efac10eec053))

# [1.2.0](https://github.com/jakowenko/double-take/compare/v1.1.0...v1.2.0) (2021-09-30)


### Bug Fixes

* **ui:** remove frigate status icon if removed after displayed ([f01c735](https://github.com/jakowenko/double-take/commit/f01c7355c692a67ea653439e169bd3b50f01cc66))


### Features

* custom webkit scrollbars to match theme ([b6620af](https://github.com/jakowenko/double-take/commit/b6620afe570fc79e4d3f6968eb4c2b9217027840))
* **ui:** change ui and editor theme via config ([5d6d123](https://github.com/jakowenko/double-take/commit/5d6d123665f0227810e610f89afe3800d79b64f7))
* **ui:** log page for viewing / clearing log file ([#113](https://github.com/jakowenko/double-take/issues/113)) ([2ab8d14](https://github.com/jakowenko/double-take/commit/2ab8d146461a2703f880be01367e4bdef0c15b13))
* **ui:** mqtt status on config page ([7b3b425](https://github.com/jakowenko/double-take/commit/7b3b42597ed52fb4f86924cc56142f4eedc9f3dd))

# [1.1.0](https://github.com/jakowenko/double-take/compare/v1.0.0...v1.1.0) (2021-09-25)


### Bug Fixes

* call for new matches on paginated page after loading is set to false ([231ac12](https://github.com/jakowenko/double-take/commit/231ac128f964028a4403395e373b210012e0a607))
* don't reset filters when all results on page are deleted ([#106](https://github.com/jakowenko/double-take/issues/106)) ([bf5ebac](https://github.com/jakowenko/double-take/commit/bf5ebacd05ff66113886056ec58f34c9a30f4d1f))
* pass camera name when reprocessing image ([cbe7a57](https://github.com/jakowenko/double-take/commit/cbe7a57907b2bc3148b7d523b03b240d3daa224a))
* replace image-size with probe-image-size ([5b7816a](https://github.com/jakowenko/double-take/commit/5b7816a78cba2e4502266140506157215ec6b289))


### Features

* ability to override frigate options per camera ([#110](https://github.com/jakowenko/double-take/issues/110)) ([e2f93e6](https://github.com/jakowenko/double-take/commit/e2f93e63d0f7031b92690e612f9b57d28ebe4adc))
* **ui:** camera and event type filters ([#106](https://github.com/jakowenko/double-take/issues/106)) ([c914308](https://github.com/jakowenko/double-take/commit/c91430843587291974627138b8370bdb9db61632))

# [1.0.0](https://github.com/jakowenko/double-take/compare/v0.10.2...v1.0.0) (2021-09-21)


### Bug Fixes

* add auth middleware to filters route ([d25c1fd](https://github.com/jakowenko/double-take/commit/d25c1fd5baa53cee28990f3b1e999aa73bd08914))
* add auth token to saveURLs function ([#70](https://github.com/jakowenko/double-take/issues/70)) ([167758f](https://github.com/jakowenko/double-take/commit/167758f1c2a0d9ad71fb47bd02e16235716434cf))
* add support for multiple training uploads ([#77](https://github.com/jakowenko/double-take/issues/77)) ([142b3f7](https://github.com/jakowenko/double-take/commit/142b3f7ec39a11e63327dc50a2081407ab023e6f))
* better error handling when training fails to prevent stuck loading bar ([07dfd25](https://github.com/jakowenko/double-take/commit/07dfd250fdc357574dc45eca51e2ce2060a5c69f))
* better handling of new filters ([3fffa6e](https://github.com/jakowenko/double-take/commit/3fffa6e04b41fa14b3c2eba6bbea08cb5c5701ab))
* button alignment on train toolbar ([c9b38ce](https://github.com/jakowenko/double-take/commit/c9b38ce9134abeb87e2c74edace8660423d4e180))
* catch errors from recognize/test ([51629d3](https://github.com/jakowenko/double-take/commit/51629d3f970c4458cc472f5738701dc4ccc8c062))
* catch get-orientation errors ([d1ca17d](https://github.com/jakowenko/double-take/commit/d1ca17d1215a204f4d765476d42a43868accb5ad))
* catch if paginated page has no results and return to page 1 ([713be92](https://github.com/jakowenko/double-take/commit/713be926a3fa4c1aa686f2afc64a45809ac4f0e2))
* catch invalid config on save before writing file ([#94](https://github.com/jakowenko/double-take/issues/94)) ([e4503e8](https://github.com/jakowenko/double-take/commit/e4503e86082e5c182a40801cf542c59abcfa586c))
* catch when time format is null ([#98](https://github.com/jakowenko/double-take/issues/98)) ([ed872dd](https://github.com/jakowenko/double-take/commit/ed872dd4dbc7f85c6a6c2232bf5bf5d7362997c3))
* check for first number in status to determine if file is trained or untrained ([125f96e](https://github.com/jakowenko/double-take/commit/125f96e2d7eba324a98b14000367ec310b631459))
* clean /tmp files after processing and remove all on restarts [#76](https://github.com/jakowenko/double-take/issues/76) ([a5c761f](https://github.com/jakowenko/double-take/commit/a5c761fc01f4d524a45b139d4539d6d85eb4d505))
* clean mqtt /tmp files after processing [#76](https://github.com/jakowenko/double-take/issues/76) ([b6478ce](https://github.com/jakowenko/double-take/commit/b6478ce9e3c50ba9302e1179c2a7951fae51c8be))
* clear disabled array ([dd84f85](https://github.com/jakowenko/double-take/commit/dd84f85ebbdd62f1beeec7252e313ee9f99390ee))
* define default value for error ([5f27099](https://github.com/jakowenko/double-take/commit/5f27099360c6616fb69385ad0081d4962906c07d))
* don't reprocess if no detectors configured ([157e7c7](https://github.com/jakowenko/double-take/commit/157e7c78f9428564278916833da919d95958dccc))
* loop through compreface plugin results on ui ([83cea24](https://github.com/jakowenko/double-take/commit/83cea249f250ae2a4d3512d9360e5de157cb55ed))
* **mqtt:** don't publish message if client isn't connected ([5901ebe](https://github.com/jakowenko/double-take/commit/5901ebef1bbe9992c08ee315e9c9fceb496db662))
* pass auth token on /cameras route to recognize endpoint ([2e940bf](https://github.com/jakowenko/double-take/commit/2e940bf39958e8498064185d1b2a9218ea283146))
* pass upcoming filename to start function to use in response ([32f0bae](https://github.com/jakowenko/double-take/commit/32f0bae40ffd1c4e48d9bc31117cb7f618c549fc))
* prevent pagination changes if api is loading ([c767aae](https://github.com/jakowenko/double-take/commit/c767aaed927e70e993ec42fdeaa1e81fb2dbabbb))
* sanpshot mask check ([56f3ea6](https://github.com/jakowenko/double-take/commit/56f3ea6c40cbe1f2312fd2d5a32ee13ff245dedd))
* update respond middleware to use res.customStatusCode instead of native res.statusCode ([caf6a89](https://github.com/jakowenko/double-take/commit/caf6a891d682f8d8afcc7ede9a1158b93aee21a9))
* use HTTPSuccess for test controller response ([9bcf8fa](https://github.com/jakowenko/double-take/commit/9bcf8faa65ea4f0c1b5451c08bfeba6d30e836e6))


### chore

* release ([824db79](https://github.com/jakowenko/double-take/commit/824db79af1f007e4188e16d4d6723af746ea25b3))


### Features

* ability to adjust thumbnail quality/size and page limit ([e5207fa](https://github.com/jakowenko/double-take/commit/e5207fa8b39affa4a72e6213a0817b17781ff5ae))
* ability to include base64 encoded string in API results and MQTT messages ([#52](https://github.com/jakowenko/double-take/issues/52)) ([233d56a](https://github.com/jakowenko/double-take/commit/233d56a36e09b6c408131ce64461e449021b8811))
* ability to increase auth token expiration ([#78](https://github.com/jakowenko/double-take/issues/78), [#80](https://github.com/jakowenko/double-take/issues/80)) ([d68d39e](https://github.com/jakowenko/double-take/commit/d68d39ef0faf5d20edfbf9099bc0108e7e4dd6fd))
* ability to mask images before processing [#79](https://github.com/jakowenko/double-take/issues/79) ([decb245](https://github.com/jakowenko/double-take/commit/decb245a5e1efd61af58e02354885e7952bf761f))
* ability to reprocess images from the matches page ([#84](https://github.com/jakowenko/double-take/issues/84)) ([809d5f3](https://github.com/jakowenko/double-take/commit/809d5f3f3b6e41825a685deec8deb613306fc277))
* ability to resize source images with query string ([c2ea600](https://github.com/jakowenko/double-take/commit/c2ea60055ccad0df7fe3b191a369146551f20812))
* add a delay expressed in seconds between each detection loop ([#83](https://github.com/jakowenko/double-take/issues/83)) ([23dc29e](https://github.com/jakowenko/double-take/commit/23dc29e4c9e4cb6a382650ac563006326995773a))
* add createdAt, updatedAt to detector detail and tooltip ([#100](https://github.com/jakowenko/double-take/issues/100)) ([03c83f5](https://github.com/jakowenko/double-take/commit/03c83f5a24dc48632ede070bbba0a4905d703299))
* allow customizing frigate labels ([#95](https://github.com/jakowenko/double-take/issues/95)) ([5eb100a](https://github.com/jakowenko/double-take/commit/5eb100a0653e0fbe07efe827c0b0f6a9c07efd5a))
* apple-touch-startup-image and theme color ([d8106bb](https://github.com/jakowenko/double-take/commit/d8106bbf61169a0da9f5d14e239e697619117beb))
* configure detector timeouts ([f654dec](https://github.com/jakowenko/double-take/commit/f654dec6cdf9819bfdbc337261af4cf8e11a9d8e))
* copy yaml config with defaults ([052ab4b](https://github.com/jakowenko/double-take/commit/052ab4b63553f70ae2457f2ead3a42c45bcdaf6a))
* enable or disable frigate mqtt topic snapshot processing ([#83](https://github.com/jakowenko/double-take/issues/83)) ([3bf2bea](https://github.com/jakowenko/double-take/commit/3bf2beac78d139a746d4dd6308e54aff65e5c155))
* filter training results when dropdown is used ([#89](https://github.com/jakowenko/double-take/issues/89)) ([81232aa](https://github.com/jakowenko/double-take/commit/81232aa7d2c23cf0fe72084ef9ea976c8e534732))
* include reasons why image was a miss on matches page ([#90](https://github.com/jakowenko/double-take/issues/90)) ([f5e220b](https://github.com/jakowenko/double-take/commit/f5e220bd923b7e9621b7063aafacacf790dbb342))
* include version on config page with ability to copy ([029bfea](https://github.com/jakowenko/double-take/commit/029bfeaf9d44859a91e05eaef989c8c6dbd34fcf))
* log level support ([#84](https://github.com/jakowenko/double-take/issues/84)) ([5f91b83](https://github.com/jakowenko/double-take/commit/5f91b83d8df22d410dd6895c3d78f1c04e4793cd))
* pagination and filtering on all matches + refactoring ([af30071](https://github.com/jakowenko/double-take/commit/af300715852b8a9717c86e8bd30538607f1042ce))
* publish errors to mqtt topic ([#52](https://github.com/jakowenko/double-take/issues/52)) ([01a2d6c](https://github.com/jakowenko/double-take/commit/01a2d6cfa5fac13425dc555edc9b680a951537b9))
* redact secrets and keys from logs ([0f3ef02](https://github.com/jakowenko/double-take/commit/0f3ef0274deda4e2b15de0ac2137c0e131cb0d55))
* sockets for live reloading ([50fef76](https://github.com/jakowenko/double-take/commit/50fef76ac6cc8a43c22912d0725117f933d60e71))
* support for compreface mask plugin ([#85](https://github.com/jakowenko/double-take/issues/85)) ([7951524](https://github.com/jakowenko/double-take/commit/795152451943d0d55a1f778365a7fad23fe62934))
* support for multiple frigate urls and topics ([4ead9f7](https://github.com/jakowenko/double-take/commit/4ead9f7562e6ab82fe93909f47dbe50aa0aba624))
* **train:** pagination ([f749437](https://github.com/jakowenko/double-take/commit/f749437e8bb4c666472799c088939705dc416cab))


### BREAKING CHANGES

* v1.0.0
