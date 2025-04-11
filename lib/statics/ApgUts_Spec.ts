/** ---------------------------------------------------------------------------
 * @module [ApgUts]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.1 [APG 2022/09/09] Alpha version
 * @version 0.9.2 [APG 2023/04/18]
 * @version 1.0.0 [APG 2024/12/24] Moving to Deno 2
 * ----------------------------------------------------------------------------
 */


/**
 * Static functions to implement a Bare minimal testing tool
 */
export class ApgUts_Spec {

    static passed = 0;
    static failed = 0;



    /**
     * Initialize counters
     */
    static Init() {

        this.passed = 0;
        this.failed = 0;

    }



    /**
     * Prompt a cosmetic header title for a series of tests
     * @param atitle to show in the header
     */
    static Title(
        atitle: string
    ) {

        console.log(`=================================================================`)
        console.log(atitle);
        console.log(`-----------------------------------------------------------------`)

    }

    

    /**
     * Prompt a resume footer with the statistics of passed and failed tests
     */
    static Resume() {

        const total = this.failed + this.passed;
        console.log(`-----------------------------------------------------------------`)
        console.log(`Total: ${total}, Passed: ${this.passed}, Failed: ${this.failed}\n`)

    }



    /**
     * Asserts a check on an expected true value. Increments the counters accordingly.
     * @param afeature under testing (method, function, algorithm ecc.)
     * @param atrueValue to check
     */
    static AssertTrue(
        afeature: string,
        atrueValue: boolean
    ) {


        if (atrueValue) {
            this.passed++;
        }
        else {
            this.failed++;
        }

        const result = (atrueValue === true) ? 'PASSED' : 'FAILED';
        const color = (atrueValue === true) ? 'green' : 'red';

        console.log("  For the test " + afeature);

        console.log('    We expect true and we got ' + atrueValue + ' => %c' + result, 'color:' + color);

    }



    /**
     * Asserts a check on an expected false value. Increments the counters accordingly.
     * @param afeature under testing (method, function, algorithm ecc.)
     * @param afalseValue to check
     */
    static AssertFalse(
        amessage: string,
        afalseValue: boolean
    ) {

        if (!afalseValue) {
            this.passed++;
        }
        else {
            this.failed++;
        }

        const result = (afalseValue === false) ? 'PASSED' : 'FAILED';
        const color = (afalseValue === false) ? 'green' : 'red';

        console.log("  For the test " + amessage);

        console.log('    We expect false and we got ' + afalseValue + ' => %c' + result, 'color:' + color);

    }



    /**
     * Asserts a check on a primitive-type value. Increments the counters accordingly.
     * @param afeature under testing (method, function, algorithm ecc.)
     * @param aprimitiveValue to check
     * @param aexpectedValue to compare with
     */
    static AssertPrimitive(
        amessage: string,
        aprimitiveValue: boolean | number | string | Date,
        aexpectedValue: boolean | number | string | Date
    ) {

        let r = false;

        if (typeof aprimitiveValue == typeof aexpectedValue) {
            if (aprimitiveValue === aexpectedValue) {
                r = true
            }
        }

        if (r) {
            this.passed++;
        }
        else {
            this.failed++;
        }

        const result = (r) ? 'PASSED' : 'FAILED';
        const color = (r) ? 'green' : 'red';

        console.log("  For the test " + amessage);

        console.log('    We expect ' + aexpectedValue + ' and we got ' + aprimitiveValue + ' => %c' + result, 'color:' + color);

    }


}

