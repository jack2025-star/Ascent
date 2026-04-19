#include <iostream>
#include <string>

class Ascent {
private:
	std::string name;
	int days_code;

public:
	Ascent(std::string n):name(n),days_code(0){ }

	void code_days() {
		days_code++;
		std::cout << "第" << days_code << "天攀登。" << std::endl;
	}

	void show_status()
	{
		std::cout << "攀登者：" << name
			<< ",已攀登" << days_code << "天" << std::endl;

		if (days_code >= 1) std::cout << "AI应用，Cplusplus+Python" << std::endl;
	}
};

int main()
{
	Ascent climber("persistent");
	climber.show_status();
	climber.code_days();
	climber.show_status();
	return 0;
}