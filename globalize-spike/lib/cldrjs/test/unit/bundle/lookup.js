define([
	"src/bundle/lookup",
	"src/core",
	"json!cldr-data/supplemental/likelySubtags.json"
], function( bundleLookup, Cldr, likelySubtags ) {

	describe( "Bundle Lookup", function() {

		before(function() {
			Cldr.load( likelySubtags );
		});

		// This test must pass to ensure this whole unit test run under the planned premises.
		it( "should pass test's prerequisites", function() {
			expect( Cldr._availableBundleMapQueue ).to.not.include.members([ "sr", "sr-Cyrl", "sr-Latn" ]);
			expect( Cldr._availableBundleMap ).to.not.contain.keys( "sr", "sr-Latn" );
		});

		it( "should set the correct bundle", function() {
			var sr;
			Cldr.load({
				main: { "sr-Cyrl": {} }
			});
			expect( Cldr._availableBundleMapQueue ).to.include.members([ "sr-Cyrl" ]);
			sr = new Cldr( "sr" );
			expect( Cldr._availableBundleMapQueue ).to.eql([]);
			expect( Cldr._availableBundleMap ).to.contain.keys( "sr" );
			expect( Cldr._availableBundleMap.sr ).to.equal( "sr-Cyrl" );
			expect( sr.attributes.bundle ).to.equal( "sr-Cyrl" );
			sr = new Cldr( "sr-Cyrl" );
			expect( sr.attributes.bundle ).to.equal( "sr-Cyrl" );
			sr = new Cldr( "sr-RS" );
			expect( sr.attributes.bundle ).to.equal( "sr-Cyrl" );
			sr = new Cldr( "sr-Cyrl-RS" );
			expect( sr.attributes.bundle ).to.equal( "sr-Cyrl" );
			sr = new Cldr( "sr-Latn-RS" );
			expect( sr.attributes.bundle ).to.be.null;
		});

		it( "should always favor the grandest parent", function() {
			var sr;
			Cldr.load({
				main: { "sr": {} }
			});
			expect( Cldr._availableBundleMapQueue ).to.include.members([ "sr" ]);
			sr = new Cldr( "sr" );
			expect( Cldr._availableBundleMapQueue ).to.eql([]);
			expect( Cldr._availableBundleMap ).to.contain.keys( "sr" );
			expect( Cldr._availableBundleMap.sr ).to.equal( "sr" );
			expect( sr.attributes.bundle ).to.equal( "sr" );
			sr = new Cldr( "sr-Cyrl" );
			expect( sr.attributes.bundle ).to.equal( "sr" );
			sr = new Cldr( "sr-RS" );
			expect( sr.attributes.bundle ).to.equal( "sr" );
		});

	});

	it("should always favor the grandest parent", function() {
		var sr;
		Cldr.load({
			main: { sr: {} }
		});
		expect(Cldr._availableBundleMapQueue).to.include.members(["sr"]);
		sr = new Cldr("sr");
		expect(Cldr._availableBundleMapQueue).to.eql([]);
		expect(Cldr._availableBundleMap).to.contain.keys("sr");
		expect(Cldr._availableBundleMap.sr).to.equal("sr");
		expect(sr.attributes.bundle).to.equal("sr");
		sr = new Cldr("sr-Cyrl");
		expect(sr.attributes.bundle).to.equal("sr");
		sr = new Cldr("sr-RS");
		expect(sr.attributes.bundle).to.equal("sr");
	});

	it("should remove problematic bundle from the global _availableBundleMapQueue on failure", function() {
		Cldr.load(
			{
				main: { bg: {} } // valid
			},
			{
				main: { xx: {} } // invalid
			},
			{
				main: { sr: {} } // valid
			}
		);

		expect(Cldr._availableBundleMapQueue).to.eql(["bg", "xx", "sr"]);

		expect(() => {
			// triggers the loading of bundle queue
			new Cldr("bg");
		}).to.throw();

		expect(Cldr._availableBundleMapQueue).to.eql(["bg", "sr"]);

		// the invalid bundle has been removed so we can load bg
		new Cldr("bg");

		// and sr, which will now trigger the loading of the rest of the queue
		new Cldr("sr");

		expect(Cldr._availableBundleMapQueue).to.eql([]);
	});
});
