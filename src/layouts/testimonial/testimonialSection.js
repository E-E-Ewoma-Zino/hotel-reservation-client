// Testimonial Section

import TestimonialCard from "./testimonialCard/testimonialCard";

function TestimonialSection() {
	return(
		<section className="testimonial-area section-gap">
			<div className="container">
				<div className="row d-flex justify-content-center">
					<div className="menu-content pb-70 col-lg-8">
						<div className="title text-center">
							<h1 className="mb-10">Testimonial from our Clients</h1>
							<p>The French Revolution constituted for the conscience of the dominant aristocratic class a
								fall from </p>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="active-testimonial">
						<TestimonialCard username="Carolyn Craig" review="A purpose is the eternal condition for success. Every former smoker can tell you just
									how hard it is to stop smoking cigarettes. However." img="/assets/img/elements/user2.png" rating="3" />
						<TestimonialCard username="Harriet Maxwell" review="Do you want to be even more successful? Learn to love learning and growth. The more
									effort you put into improving your skills, the bigger the payoff you." img="/assets/img/elements/user1.png" rating="4" />
						<TestimonialCard username="Carolyn Craig" review="A purpose is the eternal condition for success. Every former smoker can tell you just
									how hard it is to stop smoking cigarettes. However." img="/assets/img/elements/user2.png" rating="3" />
						<TestimonialCard username="Harriet Maxwell" review="Do you want to be even more successful? Learn to love learning and growth. The more
									effort you put into improving your skills, the bigger the payoff you." img="/assets/img/elements/user1.png" rating="4" />
						<TestimonialCard username="Carolyn Craig" review="A purpose is the eternal condition for success. Every former smoker can tell you just
									how hard it is to stop smoking cigarettes. However." img="/assets/img/elements/user2.png" rating="4" />
						<TestimonialCard username="James" review="Love this site" img="/assets/img/elements/user2.png" rating="2" />
					</div>
				</div>
			</div>
		</section>
	);
}

export default TestimonialSection;