function circleOnLine( C, L ) {

    var normal = normalLine(L);


}


function normalLine ( L ) {
	// L: a -> b
	
	var distance = Math.sqrt( Math.pow(L.B.x - L.A.x, 2) + Math.pow(L.B.y - L.A.y, 2));
	var midPoint = { x: (L.A.x + L.B.x)/2,  y: (L.A.y + L.B.y)/2 };
	
	//var slope = (L.b.y - L.a.y) / (L.b.x - L.a.x);
	var negativeSlope = (-1) * (L.B.x - L.A.x) / (L.B.y - L.A.y);
	
	// y = mx + b		
	// --> m = slope // We'll use the negative slope
	// --> x, y = initial point // We'll use the midPoint
	// --> b = our target  -> b = y - mx
	
	var B = midPoint.y - negativeSlope*midPoint.x;
	
	// y = mx + b		
	// x = (y - b)/m	
	
	var line = { A: {x: (midPoint.x - distance/2), 
					 y: (midPoint.x - distance/2)*negativeSlope + B} ,
				 B: {x: (midPoint.x + distance/2), 
					 y: (midPoint.x + distance/2)*negativeSlope + B} 
				};
	return line;
}
