<?xml version="1.0"?> 
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:template match="/">
 
    <div class="row">
        <div class="col">
            <h1>
                <xsl:value-of select = "recipes/recipe[id=2]/title"/>
            </h1>
            <h2>
                Ingredients
            </h2>
            <ul> 
            <xsl:for-each select = "recipes/recipe[id=2]/ingredients/ingredient">
                <li>
                <xsl:value-of select = "."/>
                </li>        
            </xsl:for-each>
            </ul>
            <h2>
                Instructions
            </h2>
            <p>
                <xsl:value-of select = "recipes/recipe[id=2]/instructions"/> 
            </p>
        </div>
    </div>

</xsl:template>
</xsl:stylesheet>
