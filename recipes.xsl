<?xml version="1.0"?> 
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:template match="/">
<xsl:for-each select = "//recipe">
<div class = "recipe-container"> 

    <h1>
        <xsl:value-of select = "title"/>
    </h1>
    <h2>
        Ingredients
    </h2>
    <ul>
        <xsl:for-each select = "//ingredient">
            <li>
                <xsl:value-of select = "."/>
            </li>        
        </xsl:for-each>
    </ul>
    <h2>
        Instructions
    </h2>
    <p>
        <xsl:value-of select = "instructions"/>
    </p>
</div>
</xsl:for-each>
</xsl:template>
</xsl:stylesheet>