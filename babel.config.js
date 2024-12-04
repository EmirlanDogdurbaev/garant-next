module.exports = {
    presets: [
        "next/babel",
        "@babel/preset-env",
        "@babel/preset-react",
        ["@babel/preset-env", {"targets": {"node": "current"}}],
    ],

}
;
