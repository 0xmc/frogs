package main

// Frog is one objectively cute frog. Every photo is hotlinked from Wikimedia
// Commons; Source links to the file page that carries the full license.
type Frog struct {
	Name     string `json:"name"`
	Species  string `json:"species"`
	ImageURL string `json:"imageUrl"`
	Source   string `json:"source"`
	Credit   string `json:"credit"`
}

const commons = "https://commons.wikimedia.org/wiki/"

var frogs = []Frog{
	{
		Name:     "Desert rain frog",
		Species:  "Breviceps macrops",
		ImageURL: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/db/Breviceps_macrops_454407799.jpg/960px-Breviceps_macrops_454407799.jpg",
		Source:   commons + "File:Breviceps_macrops_454407799.jpg",
		Credit:   "Dylan Leonard, CC BY-SA 4.0",
	},
	{
		Name:     "Red-eyed tree frog",
		Species:  "Agalychnis callidryas",
		ImageURL: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e3/Red-eyed_Tree_Frog_%28Agalychnis_callidryas%29_1.png/960px-Red-eyed_Tree_Frog_%28Agalychnis_callidryas%29_1.png",
		Source:   commons + "File:Red-eyed_Tree_Frog_(Agalychnis_callidryas)_1.png",
		Credit:   "Geoff Gallice, derivative by B kimmel, CC BY 2.0",
	},
	{
		Name:     "Tomato frog",
		Species:  "Dyscophus antongilii",
		ImageURL: "https://upload.wikimedia.org/wikipedia/commons/c/c2/TomatoFrog.jpg",
		Source:   commons + "File:TomatoFrog.jpg",
		Credit:   "Firereptiles at English Wikipedia, Attribution",
	},
	{
		Name:     "Black rain frog",
		Species:  "Breviceps fuscus",
		ImageURL: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/68/Black_Rain_Frog_imported_from_iNaturalist_photo_15409540.jpg/960px-Black_Rain_Frog_imported_from_iNaturalist_photo_15409540.jpg",
		Source:   commons + "File:Black_Rain_Frog_imported_from_iNaturalist_photo_15409540.jpg",
		Credit:   "Tony Rebelo, CC BY-SA 4.0",
	},
	{
		Name:     "Australian green tree frog",
		Species:  "Ranoidea caerulea",
		ImageURL: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8b/Australia_green_tree_frog_%28Litoria_caerulea%29_crop.jpg/960px-Australia_green_tree_frog_%28Litoria_caerulea%29_crop.jpg",
		Source:   commons + "File:Australia_green_tree_frog_(Litoria_caerulea)_crop.jpg",
		Credit:   "LiquidGhoul, public domain",
	},
	{
		Name:     "Banded bullfrog",
		Species:  "Kaloula pulchra",
		ImageURL: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a3/Kaloula_pulchra%2C_Banded_bullfrog_-_Nong_Phai%2C_Phetchabun_%2820253335546%29_%28cropped%29.jpg/960px-Kaloula_pulchra%2C_Banded_bullfrog_-_Nong_Phai%2C_Phetchabun_%2820253335546%29_%28cropped%29.jpg",
		Source:   commons + "File:Kaloula_pulchra,_Banded_bullfrog_-_Nong_Phai,_Phetchabun_(20253335546)_(cropped).jpg",
		Credit:   "Rushen, CC BY-SA 2.0",
	},
	{
		Name:     "Strawberry poison dart frog",
		Species:  "Oophaga pumilio",
		ImageURL: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/35/Strawberry_poison_dart_frog_%2870539%29.jpg/960px-Strawberry_poison_dart_frog_%2870539%29.jpg",
		Source:   commons + "File:Strawberry_poison_dart_frog_(70539).jpg",
		Credit:   "Rhododendrites, CC BY-SA 4.0",
	},
	{
		Name:     "Vietnamese mossy frog",
		Species:  "Theloderma corticale",
		ImageURL: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d8/Theloderma_corticale_-_Karlsruhe_Zoo_01.jpg/960px-Theloderma_corticale_-_Karlsruhe_Zoo_01.jpg",
		Source:   commons + "File:Theloderma_corticale_-_Karlsruhe_Zoo_01.jpg",
		Credit:   "H. Zell, CC BY-SA 3.0",
	},
	{
		Name:     "Fleischmann's glass frog",
		Species:  "Hyalinobatrachium fleischmanni",
		ImageURL: "https://upload.wikimedia.org/wikipedia/commons/6/62/Hyalinobatrachium_fleischmanni01a.jpg",
		Source:   commons + "File:Hyalinobatrachium_fleischmanni01a.jpg",
		Credit:   "Mauricio Rivera Correa, CC BY-SA 2.5",
	},
	{
		Name:     "Cope's gray treefrog",
		Species:  "Dryophytes chrysoscelis",
		ImageURL: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/76/Hyla_chrysoscelis_UMFS_2016_1.jpg/960px-Hyla_chrysoscelis_UMFS_2016_1.jpg",
		Source:   commons + "File:Hyla_chrysoscelis_UMFS_2016_1.jpg",
		Credit:   "Fredlyfish4, CC BY-SA 4.0",
	},
}
